/* 
 * WebServer V2.1
 * communication with MQTT / MySQL / WebSockets
 */
/* global __dirname */

'use strict';

var cfile="config"; // default config file

if (typeof process.argv[2] !== 'undefined'){
    cfile+="."+process.argv[2];
}
console.log("Config file is " + cfile);

// Load Main Configuration
var cfg = require('./cfg/'+cfile);

// Load loggers for debug messages
require('./modules/logger')(cfg);

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

// Connect to MySQL
const db = require('./modules/mySqlDbConnector')(cfg);
db.connect();

// Topic Cache
const topicHandler = require('./modules/topicHandler')(cfg);
var th = new topicHandler(db);

// Chart Handler
const chartHandler = require('./modules/chartHandler')(cfg);
var ch = new chartHandler(db);

// MQTT Client
const mqtt = require('mqtt');
const mqttClient  = mqtt.connect(cfg.mqttServer);
th.setMqttClient(mqttClient);

mqttClient.on('connect', () => {
    mqttClient.subscribe(cfg.mqttRootTopic + '/#');
    mqttLog.info("MQTT connected and listen to "+cfg.mqttRootTopic + '/#');
});
mqttClient.on('error', (error) => {
    mqttLog.info("MQTT Error: "+error);
});
mqttClient.on('message', (topic, message, pg) => {
    mqttLog.debug("Received from MQTT: " + topic.toString() + " value: " + message.toString());
    th.updateMessage(topic,message);    
});

// Socket Server
const socketIO = require('socket.io');
const io = socketIO(server);
th.setSocketsClient(io);
ch.setSocketsClient(io);

io.on('connection', (socket) => {
    socketsLog.info('Client connected');
    
    socket.on('poll', (data) => {
        var topic = th.respondClient(data.toString());
        socketsLog.debug('Client ask for ' + data.toString() + ' on ' + socket.id);
        socketsLog.debug("Send to client " + data.toString() + " value: " + topic.message+ " ("+ topic.formattedMessage)+")";
    });
    socket.on('chart', (data) => {
        if (!data.interval) data.interval="";
        if (!data.topicId) data.topicId="";
        console.log("Chart: " + data.topicId + " Interval: " + data.interval);
        ch.respondClient(data.topicId,data.interval);
        // if (!data.topic) return;
        socketsLog.debug('CHART: Client ask for ' + data.topicId.toString() + ' with ' + data.interval.toString() + ' on ' + socket.id);        
    });
    socket.on('set', (data) => {
        mqttClient.publish(data.topic,data.message);
        mqttLog.debug('Client sent ' + data.topic + ' with value: ' + data.message + ' on ' + socket.id);
    });    
    socket.on('disconnect', () => socketsLog.info('Client disconnected'));
});
