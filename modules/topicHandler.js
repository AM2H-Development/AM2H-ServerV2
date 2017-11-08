/* 
 * Topic Handler and Connection to DB
 */

// Libraries
var math = require('mathjs');

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

        this.mqttClient;
        this.socketsClient;
        
        Object.entries(topics).forEach((element) => {
            topics[element[0]].topic=element[0]; // name the topic inside the object
            if (!topics[element[0]].message){topics[element[0]].message=0;} // check if message variable is available
            
            db.readTopic(element[0], (res) => {
                // console.log("restore " + res.topic + " with " + res.message);
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
    
    setMqttClient(c){
        this.mqttClient=c;
    }
    
    setSocketsClient(c){
        this.socketsClient=c;
    }
    
    getMessage(topic){
        if (topics[topic]) return topics[topic].message;
        return undefined;
    }

    getTs(topic){
        if (topics[topic]) return topics[topic].ts;
        return undefined;
    }
    
    updateMessage(topic,message){
        var post  = {message: message.toString(), topic: topic.toString()};
        this.socketsClient.emit(topic,post);

        if (!topics[topic]) return; // Return if topic is not defined

        if (topics[topic].formatter){
            console.log(math.eval(topics[topic].formatter,{v:parseFloat(message)}));
        }
        
        topics[topic].oldMessage=topics[topic].message; // update message
        topics[topic].oldTs=topics[topic].ts; // update message
        topics[topic].message=message;
        topics[topic].ts=Date.now();
        
        if (this.tidx[topic]){ // touch triggers
            this.tidx[topic].forEach((element) => {
                if (topics[element].calc){
                    // console.log("Touch " + element); 
                    var vCount=0; // mathjs variable counter
                    var vMidx={}; // index of mathjs variables / messages
                    const regex = /\{\{([^\}]*)\}\}/g;
                    const str = topics[element].calc;
                    var ev = str;
                    let m;
                    while ((m = regex.exec(str)) !== null) {
                        if (m.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }
                        if (!topics[m[1]]){ // if topic is not defined set message to 0
                            vMidx["nd"]=0;
                            ev = ev.replace(m[0].toString(),"nd");
                        } else {
                            vMidx["v"+vCount]=topics[m[1]].message.toString();
                            ev = ev.replace(m[0].toString(),"v"+vCount++);
                        }
                    }
                }                                    
                // console.log(vMidx);
                topics[element].message = math.eval(ev,vMidx);
                // console.log(ev + " = " + topics[element].message);
                this.mqttClient.publish(element.toString(),topics[element].message.toString());
            });
        }
        if (topics[topic].logger && topics[topic].logger.condition){
            this["log_"+topics[topic].logger.condition](topics[topic]);
        } else this.log_all(topics[topic]);
    }

    // Loggers
    log_none(topic){
    }
    
    log_all(topic){
        // console.log("log_all");
        if (!topic.logger.newonly || (topic.message !== topic.oldMessage)){
            // console.log ("Topic to DB: " + topics[topic].topic);
            db.writeTopic(topic);
        }
    }

    log_atMost(topic){
        // console.log("log_atMost");
        if ((!topic.logger.newonly || (topic.message !== topic.oldMessage)) && (topic.ts>topic.oldTs+topic.logger.interval*1000)){
            db.writeTopic(topic);
        }

    }
}

var th = new TH();
module.exports=th;