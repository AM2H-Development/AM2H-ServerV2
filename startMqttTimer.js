/* 
 * MQTT Timer V2
 */
'use strict';

// Load Main Configuration
var cfg = require('./cfg/config');

// Load MQTT Timer
const mqttTimer = require('./modules/mqttTimer');
mqttTimer.setProperties(cfg,()=>{mqttTimer.start();});