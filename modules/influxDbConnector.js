/* 
 * Connector to DB
 */
module.exports = function(cfg) {
    
var moment = require('moment');
const http = require('http');

class DB {
    constructor(){
        this.mysqlClient;
        this.cfg = cfg;
        require('./logger')(cfg);
        this.dbLog = require('winston').loggers.get('db');
    }
    connect(){
        this.dbLog.info("Using influxDB on " + this.cfg.influxServerUrl + " with DB:" + this.cfg.influxDatabase);
        return this;
    }
    writeTopic(topicObject){
    const serverUrl = new URL(this.cfg.influxServerUrl);
	var options = {
          path: '/write?db='+ this.cfg.influxDatabase + '&precision=ms',
          method: 'POST'
        };

        // console.log("Write: " + topicObject.topic + " value: " + topicObject.message + " ts: " + topicObject.ts);
        var _topic = this._trans(topicObject.topic);
        
        // const postData= "home,dev=" + _topic.dev + ",loc=" + _topic.loc + " " + _topic.val + "=" + topicObject.message + " " + topicObject.ts;
       //const postData= "home,dev=" + _topic.dev + ,val=" + _topic.val + " " + _topic.loc + "=" + topicObject.message + " " + topicObject.ts;     
       const postData= "home,dev=" + _topic.dev + " " + _topic.val + "=" + topicObject.message + " " + topicObject.ts;                                                                                                                                                  
        // console.log(postData);
                
        const req = http.request(serverUrl, options);
        req.on('error', (e) => {
         this.dbLog.error(`problem with request: ${e.message}`);
        });

        // Write data to request body
        req.write(postData);
        req.end();
    }
    readTopic(topic, callback){
        var _topic = this._trans(topic);
        console.log(_topic);
        
        /* this.mysqlClient.query("CREATE TABLE IF NOT EXISTS " + this.cfg.database + "." + _topic +" ( `ts` BIGINT(20) NOT NULL , `message` VARCHAR(255) NOT NULL , PRIMARY KEY (`ts`));",
            (error) => {
                if (error) this.dbLog.error("Error: connect ETIMEDOUT at CREATE TABLE");
            });
        
        this.mysqlClient.query(
            'SELECT ts,message FROM '+ this.cfg.database +'.' + _topic + ' ORDER BY ts DESC LIMIT 1',
            topic.toString(),
            function (error, results, fields) {
                // console.log(error);
                // console.log(results);
                // console.log(fields);
                if (!error && (results.length>0)){
                    var res = {"topic": topic, "message": results[0].message, "ts": results[0].ts};
                    callback(res);
                }                        
            }); */
    }
    
    _trans(topic){
        return topic.toString().replace(/\//g ,"__");
    }
}
var db = new DB();
return db;
};