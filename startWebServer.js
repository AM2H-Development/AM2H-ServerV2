/* 
 * WebServer V2
 * communication with MQTT / MySQL / WebSockets
 */
/* global __dirname */

'use strict';

// Load Main Configuration
var cfg = require('./cfg/config');

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
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
app.set('views', path.join(__dirname, '/webServer/views'));
app.use(express.static(path.join(__dirname, 'webServer/pub')));
app.use(express.static(path.join(__dirname,'webServer/pub/' + cfg.serverDocRoot)));
app.set('view engine', 'ejs');
const server = app.listen(PORT, () => httpLog.info(`Listening on ${ PORT }`));

app.get('/', (req, res) => {
    httpLog.info("REQ:" + req.query.view);
    var page = req.query.view;
    if ((page === undefined) || (menu[page] === undefined)) page='default';
    res.render('pages/index',{active:page, menu:menu, diagram:diagram });
});

// DB connection and topic cache
const topicHandler = require('./modules/topicHandler');

// MQTT Client
const mqtt = require('mqtt');
const mqttClient  = mqtt.connect(cfg.mqttServer);
topicHandler.setMqttClient(mqttClient);

mqttClient.on('connect', () => {
    mqttClient.subscribe(cfg.mqttRootTopic + '/#');
    mqttLog.info("MQTT connected and listen to "+cfg.mqttRootTopic + '/#');
});
mqttClient.on('error', (error) => {
    mqttLog.info("MQTT Error: "+error);
});
mqttClient.on('message', (topic, message, pg) => {
    mqttLog.debug("Received from MQTT: " + topic.toString() + " value: " + message.toString());
    topicHandler.updateMessage(topic,message);    
});

// Socket Server
const socketIO = require('socket.io');
const io = socketIO(server);
topicHandler.setSocketsClient(io);

io.on('connection', (socket) => {
    socketsLog.info('Client connected');
    
    socket.on('poll', (data) => {
        socketsLog.debug('Client ask for ' + data.toString() + ' on ' + socket.id);
        socketsLog.debug("Send to client " + data.toString() + " value: " + topicHandler.respondClient(data.toString()).message+ " ("+ topicHandler.respondClient(data.toString()).formattedMessage)+")";
    });
    socket.on('chart', (data) => {
        console.log("Chart: " + data.topic + " Interval: " + data.interval);
        // if (!data.topic) return;
        if (!data.interval) data.interval="";
        socketsLog.debug('CHART: Client ask for ' + data.topic.toString() + ' with ' + data.interval.toString() + ' on ' + socket.id);        
    });
    socket.on('set', (data) => {
        mqttClient.publish(data.topic,data.message);
        mqttLog.debug('Client sent ' + data.topic + ' with value: ' + data.message + ' on ' + socket.id);
    });    
    socket.on('disconnect', () => socketsLog.info('Client disconnected'));
});