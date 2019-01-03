/* 
 * Config sample file
 * edit and rename to config.js before start the apps
 */

var config = {
    // MQTT config
    mqttServer    : "mqtt://server-mh.fritz.box:1883",
    mqttRootTopic : "mh",

    // WebServerConfig
    serverDocRoot : "mh",
    
    // Database Server config
    dbServer   : "mqtt://server-mh.fritz.box",
    dbUser     : 'pi',
    dbPassword : 'XXX',
    database   : 'mh',
    
    // Geographic config
    longitude     : 9.070314,
    latitude      : 49.080864,
    
    // Logger config
    loggerRoot : "."
};
module.exports = config;