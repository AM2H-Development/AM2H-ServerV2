/* 
 * MQTT Timer V2
 */
'use strict';
var cfile="config"; // default config file

if (typeof process.argv[2] !== 'undefined'){
    cfile+="."+process.argv[2];
}
console.log("Config file is " + cfile);

// Load Main Configuration
var cfg = require('./cfg/'+cfile);

// Load MQTT Timer
const mqttTimer = require('./modules/mqttTimer');
mqttTimer.setProperties(cfg,()=>{mqttTimer.start();});