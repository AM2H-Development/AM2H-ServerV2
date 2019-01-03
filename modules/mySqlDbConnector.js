/* 
 * Connector to DB
 */
module.exports = function(cfg) {
    
var moment = require('moment');

class DB {
    constructor(){
        this.mysqlClient;
        this.cfg = cfg; // require('../cfg/config');
        require('./logger')(cfg);
        this.dbLog = require('winston').loggers.get('db');
    }
    connect(){
        // mySQL Client
        var mysql = require('mysql');
        
        this.dbLog.info("Connect to DB with " + this.cfg.dbUser + " @ " + this.cfg.dbServer + " using DB:" + this.cfg.database);

        var mysqlClient = mysql.createConnection({
          host     : this.cfg.dbServer,
          user     : this.cfg.dbUser,
          password : this.cfg.dbPassword
        });
        
        mysqlClient.connect();
        this.mysqlClient=mysqlClient;
        
        mysqlClient.query('CREATE DATABASE IF NOT EXISTS ' + this.cfg.database +' CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;',
            (error) => {
                if (error) this.dbLog.error("Error: connect ETIMEDOUT at CREATE DATABASE");
        }); 

        return this;
    }
    writeTopic(topicObject){
        // console.log("Write: " + topicObject.topic + " value: " + topicObject.message + " ts: " + topicObject.ts);
        var post  = {ts: topicObject.ts, message: topicObject.message};
        var _topic = this._trans(topicObject.topic);

        this.mysqlClient.query('INSERT INTO '+ this.cfg.database +'.' + _topic + ' SET ?', post, (error) =>{
            if (error) {
                this.dbLog.error(error.toString());
                process.exit(5);
            }
        });

        if (topicObject.cleanup){
            // console.log("cleanup");
            var timestamp = moment().subtract(topicObject.cleanup.lifespan, topicObject.cleanup.unit).valueOf();
            this.dbLog.info(moment().format("YYYY-MM-DD HH:mm:ss.S") + " cleaning " + topicObject.topic+ " to " + timestamp);

            this.mysqlClient.query('DELETE FROM '+ this.cfg.database +'.' + _topic + ' WHERE ts < ?', [timestamp], (error) =>{
                if (error) this.dbLog.error(error.toString());
            });
        }
    }
    readTopic(topic, callback){
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
    }
    
    _trans(topic){
        return topic.toString().replace(/\//g ,"__");
    }
}
var db = new DB();
return db;
};