/* 
 * Chart Handler and Connection to DB
 */

// Libraries
var math = require('mathjs');

// Load config
var cfg = require('../cfg/config');

class CH {
    constructor(db){
        this.db = db;         
        require('./logger');
        this.dbLog = require('winston').loggers.get('db');
        this.mqttClient;
        this.socketsClient;
    }
    
    setMqttClient(c){
        this.mqttClient=c;
    }
    
    setSocketsClient(c){
        this.socketsClient=c;
    }
        
    respondClient(topic,interval){
        var emitter = setInterval(()=>{console.log("CHART"); this.socketsClient.emit(topic,"1234");}, 2000);
        
        setTimeout(()=>{clearInterval(emitter);},40000);

        // return post;
    }
}

module.exports=CH;