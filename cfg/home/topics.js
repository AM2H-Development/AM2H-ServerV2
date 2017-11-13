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
    "home/state/heating/vitotronic/temperatureOutside":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/heating/vitotronic/temperatureSetpoint":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/heating/vitotronic/temperatureSupplyFlow":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/heating/vitotronic/temperatureReturnFlow":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/heating/vitotronic/temperatureWater":{},
    "home/state/heating/vitotronic/modeHeaterValve":{},
    "home/state/heating/vitotronic/modeWaterCirculationPump":{},
    "home/state/heating/vitotronic/powerBurner":{},
    "home/state/heating/vitotronic/powerPump":{},
    "home/state/heating/vitotronic/counterBurnerStarts":{},
    "home/state/heating/vitotronic/counterBurnerStartsLastDay":{},
    "home/state/heating/vitotronic/counterBurnerStartsActualDay":{
        message:0,
        triggers:["home/state/heating/vitotronic/counterBurnerStarts","home/state/heating/vitotronic/counterBurnerStartsLastDay"],
        calc: "{{home/state/heating/vitotronic/counterBurnerStarts}} - {{home/state/heating/vitotronic/counterBurnerStartsLastDay}}",
        logger:{
            condition:"none"
        }
    },    
    
  

    "home/state/heating/vitotronic/temperatureOujjjj":{
        message:0,
        triggers:["mh/l/h1/state/t02","mh/l/h1/state/t03"],
        calc: "{{mh/l/h1/state/t02}} - {{mh/l/h1/state/t03}}",
        logger:{
            newonly:true
        }
    },
    "mh/location/raum1/state/temperature":{
        message:"123", // (optional) default message
        formatter:'concat(format(v/10,{notation: "fixed", precision: 2})," °C")', // (optional) server side formatting variable v = message as float
        logger:{ // (optional) default is onEvent
            condition:"atMost", // Condition: all (default), atMost, none
            interval:5, // for atMost (in seconds)
            newonly:true // optional: log only new values (default = false)           
        },
        cleanup:{ // default is no cleanup
            unit:"days",
            lifespan:30
        }
    },
    "mh/l/h1/state/t01":{
        message:"123", // (optional) default message
        formatter:'concat(format(v/10,{notation: "fixed", precision: 2})," °C")', // (optional) server side formatting variable v = message as float
        triggers:["mh/l/h1/state/t02","mh/l/h1/state/t04"], // (optional) additional triggers for message update
        calc: "{{mh/l/h1/state/t04}} - {{mh/l/h1/state/t02}}", // (optional) calc function
        logger:{ // (optional) default is onEvent
            condition:"atMost", // Condition: all (default), atMost, none
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
    "mh/location/raum1/state/switch":{},
    "mh/l/lamp/state":{},
    "home/event/timer/seconds":{},
    "home/event/timer/minutes":{},
    "mh/l/h1/state/t03":{
        message:"1024"
    }
};

module.exports=topics;