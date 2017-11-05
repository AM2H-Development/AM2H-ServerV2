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

var topics = {
    "mh/l/h2/state/t04":{},
    "mh/l/h1/state/t01":{
        message:"123", // (optional) default message
        triggers:["mh/l/h1/state/t02","mh/l/h1/state/t03"], // (optional) additional triggers for message update
        calc: function(_a){return _a["mh/l/h1/state/t01"].message-_a["mh/l/h1/state/t02"].message;}, // (optional) calc function
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
    }
};

module.exports=topics;