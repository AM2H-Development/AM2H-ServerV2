/* 
 * Connector to DB
 */

class DB {
    constructor(){
        this.mysqlClient;
        this.cfg = require('../cfg/config');
        require('./logger');
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
    writeTopic(topic,message){
        var ts = Date.now();
        // console.log("Write: " + topic.toString() + " value: " + message.toString() + " ts: " + ts);
        var post  = {ts: ts.toString(), message: message.toString()};
        var _topic = this._trans(topic);

        this.mysqlClient.query('INSERT INTO '+ this.cfg.database +'.' + _topic + ' SET ?', post, (error) =>{
            if (error) this.dbLog.error(error.toString());
        });   
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
        return topic.toString().toLowerCase().replace(/\//g ,"__");
    }
}
var db = new DB();
module.exports=db;