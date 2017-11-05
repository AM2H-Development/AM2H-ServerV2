/* 
 * Connoctor to DB
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
        
        mysqlClient.query('CREATE DATABASE IF NOT EXISTS ' + this.cfg.database +';', (error) => {
            if (error) this.dbLog.error("Error: connect ETIMEDOUT at CREATE DATABASE");
        }); 

        mysqlClient.query("CREATE TABLE IF NOT EXISTS " + this.cfg.database + "." + this.cfg.database +" ("
                            + " id BIGINT AUTO_INCREMENT PRIMARY KEY,"
                            + " topic VARCHAR(255), message VARCHAR(255),"
                            + " ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                            + ");", (error) => {
            if (error) this.dbLog.error("Error: connect ETIMEDOUT at CREATE TABLE");
        }); 

        return this;
    }
    writeTopic(topic,message){
        //console.log("Received from MQTT: " + topic.toString() + " value: " + message.toString());
        var post  = {message: message.toString(), topic: topic.toString()};
        this.mysqlClient.query('INSERT INTO '+ this.cfg.database +'.' + this.cfg.database + ' SET ?', post, (error) =>{
            if (error) this.dbLog.error("Error writing to DB");
        });   
    }
    readTopic(topic, callback){
        this.mysqlClient.query(
            'SELECT message FROM '+ this.cfg.database +'.' + this.cfg.database + ' WHERE topic = ? ORDER BY id DESC LIMIT 1',
            topic.toString(),
            function (error, results, fields) {
                // console.log(error);
                // console.log(results);
                // console.log(fields);
                if (!error && (results.length>0)){
                    var res = {"topic": topic, "message": results[0].message};
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
}
var db = new DB();
module.exports=db;