/* 
 * Topic Handler and Connection to DB
 */

// Load config
var cfg = require('../cfg/config');

// Connect to MySQL
var db = require('./mySqlDbConnector');
db.connect();

// Load Topics Container
var topics = require('../cfg/'+cfg.mqttRootTopic+'/topics');

class TH {
    constructor(){
        require('./logger');
        this.dbLog = require('winston').loggers.get('db');
        this.tidx={}; // index of triggers
        
        Object.entries(topics).forEach((element) => {
            db.readTopic(element[0], (res) => {
                topics[res.topic].message=res.message;
                topics[res.topic].ts=res.ts;
            });
            if (topics[element[0]].triggers){
                for (var i=0; i< topics[element[0]].triggers.length; i++){
                    var ti = this.tidx[topics[element[0]].triggers[i]];
                    if (!ti) ti=this.tidx[topics[element[0]].triggers[i]]=[];        
                    ti.push(element[0]);
                }
            }
            if (!topics[element[0]].logger){
                topics[element[0]].logger={condition:"all",newonly:false};
            } else {
                if (!topics[element[0]].logger.condition) topics[element[0]].logger.condition="all";
                if (!topics[element[0]].logger.newonly) topics[element[0]].logger.newonly=false;
                if (!topics[element[0]].logger.interval) topics[element[0]].logger.interval=1;                
            }
            if (!topics[element[0]].emitToMqtt){
                topics[element[0]].emitToMqtt=false;
            }
        });
    }
    
    getTopic(topic){
        return topics[topic].message;
    }
    
    updateTopic(topic,message){
        console.log("Update: " + topic + " : " + message);
        if (!topics[topic]) return; // Return if topic is not defined
        
        topics[topic].oldMessage=topics[topic].message; // update message
        topics[topic].message=message;
        
        if (this.tidx[topic]){ // touch triggers
            this.tidx[topic].forEach((element) => {
                if (topics[element].calc){
                    console.log("Touch " + element); 
                    topics[element].message = topics[element].calc(topics);
                    this.updateTopic(element,topics[element].message);
                }
            });
        }
        
        if (topics[topic].logger && topics[topic].logger.condition){
            this["log_"+topics[topic].logger.condition](topic,message);
        } else this.log_all(topic,message);
    }

    // Loggers
    log_all(topic){
        console.log("log_all");
        if (!topics[topic].logger.newonly || (topics[topic].message !== topics[topic].oldMessage)){
            db.writeTopic(topic,topics[topic].message);
        }
    }

    log_every(topic){
        db.writeTopic(topic,topics[topic].message);
    }
    

}

var th = new TH();
module.exports=th;