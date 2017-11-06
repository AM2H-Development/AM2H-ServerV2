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
    "mh/l/h2/state/t04":{
        message:0,
        triggers:["mh/l/h1/state/t02","mh/l/h1/state/t03"],
        calc: (_t) => {return _t.getMessage("mh/l/h1/state/t02") - _t.getMessage("mh/l/h1/state/t03");},
        logger:{
            newonly:true
        }
    },
    "mh/l/h1/state/t01":{
        message:"123", // (optional) default message
        triggers:["mh/l/h1/state/t02","mh/l/h1/state/t04"], // (optional) additional triggers for message update
        calc: (_t) => {return _t.getMessage("mh/l/h2/state/t04") - _t.getMessage("mh/l/h1/state/t02");}, // (optional) calc function
        logger:{ // (optional) default is onEvent
            condition:"atMost", // Condition: all (default), atMost
            interval:5, // for atMost (in seconds)
            newonly:true // optional: log only new values (default = false)           
        },
        cleanup:{ // default is no cleanup
            unit:"seconds",
            lifespan:30
        }
    },
    "mh/l/h1/state/t02":{
        message:"456"  
    },
    "mh/location/raum1/state/switch":{
        
    },
    "mh/l/h1/state/t03":{
        message:"1024"
    }
};

module.exports=topics;