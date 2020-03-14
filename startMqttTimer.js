/* 
 * MQTT Timer V2
 */
'use strict';
var cfile="config"; // default config file

if (typeof process.argv[2] !== 'undefined'){
    cfile+="."+process.argv[2];
}
// Load Main Configuration

try {
    var cfg = require('../user/cfg/'+cfile);
} catch {
    cfile+='.sample';
    var cfg = require('../user/cfg/'+cfile);
}

console.log("Config file is " + cfile);

// Load MQTT Timer
const mqttTimer = require('./modules/mqttTimer');
mqttTimer.setProperties(cfg,()=>{mqttTimer.start();});