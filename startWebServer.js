/* 
 * WebServer V2
 * communication with MQTT / MySQL / WebSockets
 */
/* global __dirname */

'use strict';

// Load Main Configuration
var cfg = require('./cfg/config');

// Load Topics Container
var topics = require('./cfg/'+cfg.mqttRootTopic+'/topics');

// Load loggers for debug messages
require('./modules/logger');
var mainLog = require('winston').loggers.get('main');
var httpLog = require('winston').loggers.get('http');
var socketsLog = require('winston').loggers.get('sockets');
var mqttLog = require('winston').loggers.get('mqtt');

// Load Dynamic Pages Structure
var menu    = require('./webServer/cfg/'+cfg.serverDocRoot+'/menu');
var diagram = require('./webServer/cfg/'+cfg.serverDocRoot+'/diagram');

// Express Webserver and Socket.io
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
app.set('views', path.join(__dirname, '/webServer/views'));
app.use(express.static(path.join(__dirname, 'webServer/pub')));
app.use(express.static(path.join(__dirname,'webServer/pub/' + cfg.serverDocRoot)));
app.set('view engine', 'ejs');
const server = app.listen(PORT, () => httpLog.info(`Listening on ${ PORT }`));
const io = socketIO(server);

app.get('/', (req, res) => {
    httpLog.info("REQ:" + req.query.view);
    var page = req.query.view;
    if ((page === undefined) || (menu[page] === undefined)) page='default';
    res.render('pages/index',{active:page, menu:menu, diagram:diagram });
});
// DB connection and topic cache

var db = require('./modules/dbConnector');
db.connect();

Object.entries(topics).forEach(function(element) {
    db.readTopic(element[0], (res) => {
        topics[res.topic].message=res.message;
    });
});

// MQTT Client
const mqtt = require('mqtt');
const mqttClient  = mqtt.connect(cfg.mqttServer);

mqttClient.on('connect', () => {
    mqttClient.subscribe(cfg.mqttRootTopic + '/#');
    mqttLog.info("MQTT connected");
});

mqttClient.on('error', (error) => {
    mqttLog.info("MQTT Error: "+error);
});

mqttClient.on('message', (topic, message, pg) => {
    mqttLog.debug("Received from MQTT: " + topic.toString() + " value: " + message.toString());
    if (topic.substring(0,3)!=='db'){
        var post  = {message: message.toString(), topic: topic.toString()};
        // t.trigger(topic,message);
        io.emit(topic,post);
    }
    if (topic.substring(0,3)==='db'){
        var m = {message:"123", topic:"/mh/test"};
        var post  = {message: m.message.toString(), topic: m.topic.toString()};
        // t.trigger(topic,message);
        io.emit("db/res",post);
    }
    
});

// Socket Server
io.on('connection', (socket) => {
    socketsLog.info('Client connected');
    socket.on('poll', (data) => {
        socketsLog.debug('Client ask for ' + data.toString() + ' on ' + socket.id);
        mqttClient.publish('db/poll',data.toString());
        /*var query = t.query(data);
        query.on('result', (result) => {
            socketsLog.debug("Send to client " + data.toString() + " value: " + result.message);
            socket.emit(data.toString(),{topic:data.toString(),message:result.message});
        });*/
    });
    socket.on('chart', (data) => {
        socketsLog.debug('CHART: Client ask for ' + data.topics.toString() + ' with ' + data.interval.toString() + ' on ' + socket.id);
        /* var query = t.queryChart(data);
        query.on('result', (result) => {
            socketsLog.debug("Send to client " + data.toString() + " value: " + result.message);
            socket.emit('chartdata',{data:"123"});
        });*/

    });
    socket.on('set', (data) => {
        mqttClient.publish(data.topic,data.message);
        mqttLog.debug('Client sent ' + data.topic + ' with value: ' + data.message + ' on ' + socket.id);
    });    
    socket.on('disconnect', () => socketsLog.info('Client disconnected'));
});

