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
    
    // df_heizung
    
    "home/state/heating/vitotronic/temperatureOutside":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/heating/vitotronic/temperatureSetpoint":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/heating/vitotronic/temperatureSupplyFlow":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/heating/vitotronic/temperatureReturnFlow":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/heating/vitotronic/temperatureWater":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/heating/vitotronic/modeHeaterValve":{},
    "home/state/heating/vitotronic/modeWaterCirculationPump":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/heating/vitotronic/powerBurner":{formatter:'concat(format(v/2,{notation: "fixed", precision: 1})," %")'},
    "home/state/heating/vitotronic/powerPump":{formatter:'concat(format(v/1,{notation: "fixed", precision: 1})," %")'},
    "home/state/heating/vitotronic/counterBurnerStarts":{},
    "home/state/heating/vitotronic/counterBurnerStartsLastDay":{
        triggers:["home/event/timer/day"],
        calc: "{{home/state/heating/vitotronic/counterBurnerStarts}}"
    },       
    "home/calc/heating/vitotronic/counterBurnerStartsActualDay":{
        formatter:'concat(format(v/1,{notation: "fixed", precision: 1})," %")',
        message:0,
        triggers:["home/state/heating/vitotronic/counterBurnerStarts","home/state/heating/vitotronic/counterBurnerStartsLastDay"],
        calc: "{{home/state/heating/vitotronic/counterBurnerStarts}} - {{home/state/heating/vitotronic/counterBurnerStartsLastDay}}",
        logger:{condition:"none"}
    },
    
    "home/state/metering/gasmeter/powerActual":{formatter:'concat(format(v/1000,{notation: "fixed", precision: 1})," kW")'},
    "home/state/metering/gasmeter/counterConsumptionTotal":{},     
    "home/state/metering/gasmeter/counterConsumptionLastDay":{
        triggers:["home/event/timer/day"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionTotal}}"
    },
    "home/state/metering/gasmeter/counterConsumptionLastMonth":{
        triggers:["home/event/timer/month"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionTotal}}"
    },    
    "home/state/metering/gasmeter/counterConsumptionLastYear":{
        triggers:["home/event/timer/year"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionTotal}}"
    },        
    
    "home/calc/metering/gasmeter/counterConsumptionActualDay":{
        formatter:'concat(format(v/100,{notation: "fixed", precision: 2})," m³/d")',
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastDay"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionTotal}} - {{home/state/metering/gasmeter/counterConsumptionLastDay}}",
        logger:{condition:"none"}
    },        
    "home/calc/metering/gasmeter/counterConsumptionActualMonth":{
        formatter:'concat(format(v/100,{notation: "fixed", precision: 2})," m³/m")',          
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastMonth"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionTotal}} - {{home/state/metering/gasmeter/counterConsumptionLastMonth}}",
        logger:{condition:"none"}
    },
    "home/calc/metering/gasmeter/counterConsumptionActualYear":{
        formatter:'concat(format(v/100,{notation: "fixed", precision: 1})," m³/y")',        
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastYear"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionTotal}} - {{home/state/metering/gasmeter/counterConsumptionLastYear}}",
        logger:{condition:"none"}
    },
   
    //df_lueftung
    
    "home/state/ventilation/polling/humitidyOutsideAir":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," %")'},
    "home/state/ventilation/airDistribution/temperatureSupplyAir":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/ventilation/airDistribution/humiditySupplyAir":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," %")'},
    "home/state/ventilation/airDistribution/temperatureExhaustAir":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},    
    "home/state/ventilation/airDistribution/humidityExhaustAir":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," %")'},    
    "home/calc/ventilation/airDistribution/temperatureDifference":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")',
        message:0,
        triggers:["home/state/ventilation/airDistribution/temperatureSupplyAir","home/state/ventilation/airDistribution/temperatureExhaustAir"],
        calc: "{{home/state/ventilation/airDistribution/temperatureSupplyAir}} - {{home/state/ventilation/airDistribution/temperatureExhaustAir}}",
        logger:{condition:"none"}
    },
    //"home/state/ventilation/intakeAirHeatExchanger/temperatureUpperThreshold":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    //"home/state/ventilation/intakeAirHeatExchanger/temperatureLowerThreshold":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    //"home/state/ventilation/intakeAirHeatExchanger/modeHeatExchanger":{},
    "home/state/ventilation/intakeAirBypass/modeBypass":{},
    
    //df_strom
    
    "home/state/metering/powermeter/powerActual":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," W")'},
    "home/state/metering/powermeterPV/powerActual":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," W")'},
    "home/calc/metering/powermeter/powerConsumptionActual":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," W")',        
        message:0,
        triggers:["home/state/metering/powermeter/powerActual","home/state/metering/powermeterPV/powerActual"],
        calc: "{{home/state/metering/powermeter/powerActual}} - {{home/state/metering/powermeterPV/powerActual}}",
        logger: {condition:"none"}
    },      
    
    "home/state/metering/powermeter/counterEnergyConsumptionTotal":{},
    "home/state/metering/powermeter/counterConsumptionLastDay":{
        triggers:["home/event/timer/day"],
        calc: "{{home/state/metering/powermeter/counterEnergyConsumptionTotal}}"
    },   
    "home/state/metering/powermeter/counterConsumptionLastMonth":{
        triggers:["home/event/timer/month"],
        calc: "{{home/state/metering/powermeter/counterEnergyConsumptionTotal}}"
    },   
    "home/state/metering/powermeter/counterConsumptionLastYear":{
        triggers:["home/event/timer/year"],
        calc: "{{home/state/metering/powermeter/counterEnergyConsumptionTotal}}"
    },       
    
    "home/state/metering/powermeter/counterEnergyFeedInTotal":{},
    "home/state/metering/powermeter/counterFeedInLastDay":{
        triggers:["home/event/timer/day"],
        calc: "{{home/state/metering/powermeter/counterEnergyFeedInTotal}}"
    },   
    "home/state/metering/powermeter/counterFeedInLastMonth":{
        triggers:["home/event/timer/month"],
        calc: "{{home/state/metering/powermeter/counterEnergyFeedInTotal}}"
    },   
    "home/state/metering/powermeter/counterFeedInLastYear":{
        triggers:["home/event/timer/year"],
        calc: "{{home/state/metering/powermeter/counterEnergyFeedInTotal}}}"
    },  
    
    /*
    "home/state/metering/powermeterPV/counterEnergyConsumptionTotal":{},
    "home/state/metering/powermeterPV/counterConsumptionLastDay":{
        triggers:["home/event/timer/day"],
        calc: "{{home/state/metering/powermeterPV/counterEnergyConsumptionTotal}}"
    },   
    "home/state/metering/powermeterPV/counterConsumptionLastMonth":{
        triggers:["home/event/timer/month"],
        calc: "{{home/state/metering/powermeterPV/counterEnergyConsumptionTotal}}"
    },   
    "home/state/metering/powermeterPV/counterConsumptionLastYear":{
        triggers:["home/event/timer/year"],
        calc: "{{home/state/metering/powermeterPV/counterEnergyConsumptionTotal}}"
    },       
    
    "home/state/metering/powermeterPV/counterEnergyFeedInTotal":{},
    "home/state/metering/powermeterPV/counterFeedInLastDay":{
        triggers:["home/event/timer/day"],
        calc: "{{home/state/metering/powermeterPV/counterEnergyConsumptionTotal}}"
    },   
    "home/state/metering/powermeterPV/counterFeedInLastMonth":{
        triggers:["home/event/timer/month"],
        calc: "{{home/state/metering/powermeterPV/counterEnergyConsumptionTotal}}"
    },   
    "home/state/metering/powermeterPV/counterFeedInLastYear":{
        triggers:["home/event/timer/year"],
        calc: "{{home/state/metering/powermeterPV/counterEnergyConsumptionTotal}}"
    },
    */

    "home/calc/metering/powermeter/counterConsumptionActualDay":{
    formatter:'concat(format(v/10000,{notation: "fixed", precision: 2})," kWh/d")',        
    message:0,
    triggers:["home/state/metering/powermeter/counterEnergyConsumptionTotal","home/state/metering/powermeter/counterConsumptionLastDay"],
    calc: "{{home/state/metering/powermeter/counterEnergyConsumptionTotal}} - {{home/state/metering/powermeter/counterConsumptionLastDay}}",
    logger: {condition:"none"}
    },
    "home/calc/metering/powermeter/counterFeedInActualDay":{
        formatter:'concat(format(v/10000,{notation: "fixed", precision: 2})," kWh/d")',        
        message:0,
        triggers:["home/state/metering/powermeter/counterEnergyFeedInTotal","home/state/metering/powermeter/counterFeedInLastDay"],
        calc: "{{home/state/metering/powermeter/counterEnergyFeedInTotal}} - {{home/state/metering/powermeter/counterFeedInLastDay}}",
        logger: {condition:"none"}
    },
    "home/calc/metering/powermeter/counterFeedInActualMonth":{
        formatter:'concat(format(v/10000,{notation: "fixed", precision: 0})," kWh/m")',        
        message:0,
        triggers:["home/state/metering/powermeter/counterEnergyFeedInTotal","home/state/metering/powermeter/counterFeedInLastMonth"],
        calc: "{{home/state/metering/powermeter/counterEnergyFeedInTotal}} - {{home/state/metering/powermeter/counterFeedInLastMonth}}",
        logger: {condition:"none"}
    }, 
    
    "home/calc/metering/powermeterPV/counterConsumptionActualDay":{
    formatter:'concat(format(v/10000,{notation: "fixed", precision: 2})," kWh/d")',        
    message:0,
    triggers:["home/state/metering/powermeterPV/counterEnergyConsumptionTotal","home/state/metering/powermeterPV/counterConsumptionLastDay"],
    calc: "{{home/state/metering/powermeterPV/counterEnergyConsumptionTotal}} - {{home/state/metering/powermeterPV/counterConsumptionLastDay}}",
    logger: {condition:"none"}
    },
    "home/calc/metering/powermeterPV/counterFeedInActualDay":{
        formatter:'concat(format(v/10000,{notation: "fixed", precision: 2})," kWh/d")',        
        message:0,
        triggers:["home/state/metering/powermeterPV/counterEnergyFeedInTotal","home/state/metering/powermeterPV/counterFeedInLastDay"],
        calc: "{{home/state/metering/powermeterPV/counterEnergyFeedInTotal}} - {{home/state/metering/powermeterPV/counterFeedInLastDay}}",
        logger: {condition:"none"}
    },
    "home/calc/metering/powermeterPV/counterFeedInActualMonth":{
        formatter:'concat(format(v/10000,{notation: "fixed", precision: 0})," kWh/m")',        
        message:0,
        triggers:["home/state/metering/powermeterPV/counterEnergyFeedInTotal","home/state/metering/powermeterPV/counterFeedInLastMonth"],
        calc: "{{home/state/metering/powermeterPV/counterEnergyFeedInTotal}} - {{home/state/metering/powermeterPV/counterFeedInLastMonth}}",
        logger: {condition:"none"}
    },     
    //df_water
    
    "home/state/metering/gasmeter/counterConsumptionWTotal":{},     
    "home/state/metering/gasmeter/counterConsumptionWLastDay":{
        triggers:["home/event/timer/day"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionWTotal}} - {{home/state/metering/gasmeter/counterConsumptionWLastDay}}"
    },
    "home/state/metering/gasmeter/counterConsumptionWLastMonth":{
        triggers:["home/event/timer/month"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionWTotal}} - {{home/state/metering/gasmeter/counterConsumptionWLastMonth}}"
    },    
    "home/state/metering/gasmeter/counterConsumptionWLastYear":{
        triggers:["home/event/timer/year"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionWTotal}} - {{home/state/metering/gasmeter/counterConsumptionWLastYear}}"
    },        
    
    "home/calc/metering/gasmeter/counterEnergyWActualDay":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," kWh/d")',
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionWTotal","home/state/metering/gasmeter/counterConsumptionWLastDay"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionWTotal}} - {{home/state/metering/gasmeter/counterConsumptionWLastDay}}",
        logger:{condition:"none"}
    },        
    "home/calc/metering/gasmeter/counterEnergyWActualMonth":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 0})," kWh/m")',          
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionWTotal","home/state/metering/gasmeter/counterConsumptionWLastMonth"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionWTotal}} - {{home/state/metering/gasmeter/counterConsumptionWLastMonth}}",
        logger:{condition:"none"}
    },
    "home/calc/metering/gasmeter/counterEnergyWActualYear":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 0})," kWh/y")',        
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionWTotal","home/state/metering/gasmeter/counterConsumptionWLastYear"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionWTotal}} - {{home/state/metering/gasmeter/counterConsumptionWLastYear}}",
        logger:{condition:"none"}
    },
    "home/calc/metering/gasmeter/counterEnergyWShare":{
        formatter:'concat(format(v/0.01,{notation: "fixed", precision: 1})," %")',        
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionWTotal","home/state/metering/gasmeter/counterConsumptionWLastYear","home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastMonth"],
        calc: "(({{home/state/metering/gasmeter/counterConsumptionWTotal}} - {{home/state/metering/gasmeter/counterConsumptionWLastMonth}})/({{home/state/metering/gasmeter/counterConsumptionTotal}} - {{home/state/metering/gasmeter/counterConsumptionLastMonth}}))",
        logger:{condition:"none"}
    },   
    
    //df_temp_eg
    
    //df_temp_og
    
    "home/state/heating/upperFloor/temperatureSupplyFlow":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},    
    "home/state/heating/upperFloor/temperatureReturnFlow":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},  
    "home/state/heating/upperFloor/temperatureReturnFlowGast":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},   
    "home/state/heating/upperFloor/temperatureReturnFlowToilette":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},   
    "home/state/heating/upperFloor/temperatureReturnFlowKind":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},   
    "home/state/heating/upperFloor/temperatureReturnFlowSchlafen":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},   
    "home/state/heating/upperFloor/temperatureReturnFlowBadA":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},   
    "home/state/heating/upperFloor/temperatureReturnFlowBadB":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},   
    "home/state/heating/upperFloor/temperatureReturnFlowBadHK":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},       
    "home/state/heating/upperFloor/temperatureReturnFlowFlur":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},       
  
    "home/calc/heating/upperFloor/temperatureDifference":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")',
        message:0,
        triggers:["home/state/heating/upperFloor/temperatureSupplyFlow","home/state/heating/upperFloor/temperatureReturnFlow"],
        calc: "{{home/state/heating/upperFloor/temperatureSupplyFlow}} - {{home/state/heating/upperFloor/temperatureReturnFlow}}",
        logger:{condition:"none"}
    },
    "home/calc/metering/gasmeter/counterEnergyHActualDay":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," kWh/d")',
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastDay","home/state/metering/gasmeter/counterConsumptionWTotal","home/state/metering/gasmeter/counterConsumptionWLastDay"],
        calc: "({{home/state/metering/gasmeter/counterConsumptionTotal}} - {{home/state/metering/gasmeter/counterConsumptionLastDay}})-({{home/state/metering/gasmeter/counterConsumptionWTotal}} - {{home/state/metering/gasmeter/counterConsumptionWLastDay}})",
        logger:{condition:"none"}
    },   
    "home/calc/metering/gasmeter/counterEnergyHActualMonth":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 0})," kWh/m")',
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastMonth","home/state/metering/gasmeter/counterConsumptionWTotal","home/state/metering/gasmeter/counterConsumptionWLastMonth"],
        calc: "({{home/state/metering/gasmeter/counterConsumptionTotal}} - {{home/state/metering/gasmeter/counterConsumptionLastMonth}})-({{home/state/metering/gasmeter/counterConsumptionWTotal}} - {{home/state/metering/gasmeter/counterConsumptionWLastMonth}})",
        logger:{condition:"none"}
    },    
    "home/calc/metering/gasmeter/counterEnergyHActualYear":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 0})," kWh/y")',
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastYear","home/state/metering/gasmeter/counterConsumptionWTotal","home/state/metering/gasmeter/counterConsumptionWLastYear"],
        calc: "({{home/state/metering/gasmeter/counterConsumptionTotal}} - {{home/state/metering/gasmeter/counterConsumptionLastYear}})-({{home/state/metering/gasmeter/counterConsumptionWTotal}} - {{home/state/metering/gasmeter/counterConsumptionWLastYear}})",
        logger:{condition:"none"}
    }    
    
    /*
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
    }  */
};

module.exports=topics;