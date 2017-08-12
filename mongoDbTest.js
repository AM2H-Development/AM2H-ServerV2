// Load Main Configuration
var cfg = require('./cfg/config');

var i=1;

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://'+cfg.dbServer+':27017/'+cfg.database;

console.log(url);

// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  insertDocuments(db, function() {
    db.close();
  });
  console.log("done...");

});

var insertDocuments = function(db) {
  // Get the documents collection
  var collection = db.collection('mh');
  // Insert some documents
  for (var j=0;j<300000;j++){
    collection.insertMany([{"topic":"mh/l/h1/state/t01","message":i++},{"topic":"mh/l/h1/state/t02","message":i++},{"topic":"mh/l/b1/state/t01","message":i++}]).then(); 
  }
}

