/* 
 * List all topics and define logging
 */

/*
 * cleanup available units:
 * Key          Short
 * years	y
 * quarters	Q
 * months	M
 * weeks	w
 * days         d
 * hours	h
 * minutes	m
 * seconds	s
 */

// CREATE TABLE `mh`.`mh__l__h2__state__t04` ( `ts` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `message` VARCHAR(255) NOT NULL , PRIMARY KEY (`ts`)) ENGINE = InnoDB;

var topics = {
    "mh/l/h2/state/t04":{
        message:0,
        triggers:["mh/l/h1/state/t02","mh/l/h1/state/t03"],
        calc: (_t) => {return _t["mh/l/h1/state/t02"].message - _t["mh/l/h1/state/t03"].message;},
        logger:{
            newonly:true
        }
    },
    "mh/l/h1/state/t01":{
        message:"123", // (optional) default message
        triggers:["mh/l/h1/state/t02","mh/l/h1/state/t04"], // (optional) additional triggers for message update
        calc: (_t) => {return _t["mh/l/h1/state/t04"].message - _t["mh/l/h1/state/t02"].message;}, // (optional) calc function
        emitToMqtt: true, // (optional) emit calculated messages to MQTT bus (from triggers only)
        logger:{ // (optional) default is onEvent
            condition:"every", // Condition: all, every (s), atLeast (s), atMost(s), onEvent (MQTT trigger)
            interval:5, // for every, atLeast, atMost
            newonly:true // optional: log only new values            
        },
        cleanup:{ // default is no cleanup
            unit:"seconds",
            lifespan:30
        }
    },
    "mh/l/h1/state/t02":{
        message:"456"  
    },
    "mh/l/h1/state/t03":{
        message:"1024"
    }
};

module.exports=topics;