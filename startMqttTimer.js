/* 
 * MQTT Timer V
 */
'use strict';

var cfg = require('./cfg/config');

const mqttTimer = require('./modules/mqttTimer');
mqttTimer.setProperties(cfg,()=>{mqttTimer.start();});