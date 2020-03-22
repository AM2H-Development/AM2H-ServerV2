/* 
 * Connector to DB
 */
var moment = require('moment');
const http = require('http');

class DB {
    constructor(){
        this.options;
        this.cfg = require('../cfg/config');
        require('./logger');
        this.dbLog = require('winston').loggers.get('db');
    }
    connect(){
        this.dbLog.info("Connect to influxDB on " + this.cfg.influxServerUrl + " using DB:" + this.cfg.influxDatabase);
        return this;
    }
    
    writeTopic(topicObject){
    const serverUrl = new URL(this.cfg.influxServer);
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
        console.log(postData);
        req.write(postData);
        req.end();
    }
    /*readTopic(topic, callback){
        var _topic = this._trans(topic);
        // console.log(_topic);
        
        this.mysqlClient.query("CREATE TABLE IF NOT EXISTS " + this.cfg.database + "." + _topic +" ( `ts` BIGINT(20) NOT NULL , `message` VARCHAR(255) NOT NULL , PRIMARY KEY (`ts`));",
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
            });
    }
    queryChart(data){
        // todo
        var query = this.mysqlClient.query('SELECT message FROM '+ this.cfg.database +'.' + this.cfg.database + ' WHERE topic = ? ORDER BY id DESC LIMIT 1', data.toString());

        query.on('error', (error) => {
            throw error;
        });
        
        return query;
    } */
    
    _trans(topic){
        var splits = topic.toString().split('/');  
        // return {dev:splits[splits.length-3], loc:splits[splits.length-2], val:splits[splits.length-3]+'_'+splits[splits.length-2]+'_'+splits[splits.length-1]};
        return {dev:splits[splits.length-3], val:splits[splits.length-2]+'_'+splits[splits.length-1]};        
        //return {dev:splits[splits.length-3], loc:splits[splits.length-2], val:splits[splits.length-1]};
    }
}
var influx = new DB();
module.exports=influx;
