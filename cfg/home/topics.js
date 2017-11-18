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
    "home/state/heating/vitotronic/counterBurnerStartsLastDay":{},
    "home/state/heating/vitotronic/counterBurnerStartsActualDay":{
        formatter:'concat(format(v/1,{notation: "fixed", precision: 1})," %")',
        message:0,
        triggers:["home/state/heating/vitotronic/counterBurnerStarts","home/state/heating/vitotronic/counterBurnerStartsLastDay"],
        calc: "{{home/state/heating/vitotronic/counterBurnerStarts}} - {{home/state/heating/vitotronic/counterBurnerStartsLastDay}}",
        logger:{
            condition:"none"
        }
    },
    
    "home/state/metering/gasmeter/powerActual":{formatter:'concat(format(v/1000,{notation: "fixed", precision: 1})," kW")'},   
    "home/state/metering/gasmeter/counterConsumptionActualDay":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 2})," m³/d")',
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastDay"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionTotal}} - {{home/state/metering/gasmeter/counterConsumptionLastDay}}",
        logger:{
            condition:"none"
        }
    },        
      "home/state/metering/gasmeter/counterConsumptionActualMonth":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 2})," m³/m")',          
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastMonth"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionTotal}} - {{home/state/metering/gasmeter/counterConsumptionLastMonth}}",
        logger:{
            condition:"none"
        }
    },
    "home/state/metering/gasmeter/counterConsumptionActualYear":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," m³/y")',        
        message:0,
        triggers:["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastYear"],
        calc: "{{home/state/metering/gasmeter/counterConsumptionTotal}} - {{home/state/metering/gasmeter/counterConsumptionLastYear}}",
        logger:{
            condition:"none"
        }
    },
    "home/state/heating/manifoldUpperFloor/temperatureSupplyFlow":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},    
    "home/state/heating/manifoldUpperFloor/temperatureReturnFlow":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},    
    "home/state/heating/manifoldUpperFloor/temperatureDifference":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")',
        message:0,
        triggers:["home/state/heating/manifoldUpperFloor/temperatureSupplyFlow","home/state/heating/manifoldUpperFloor/temperatureReturnFlow"],
        calc: "{{home/state/heating/manifoldUpperFloor/temperatureSupplyFlow}} - {{home/state/heating/manifoldUpperFloor/temperatureReturnFlow}}",
        logger:{
            condition:"none"
        }
    },
    
    //df_lueftung
    
    "home/state/ventilation/polling/humitidyOutsideAir":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," %")'},
    "home/state/ventilation/airDistribution/temperatureSupplyAir":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    "home/state/ventilation/airDistribution/humiditySupplyAir":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," %")'},
    "home/state/ventilation/airDistribution/temperatureExhaustAir":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},    
    "home/state/ventilation/airDistribution/humidityExhaustAir":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," %")'},    
    "home/state/ventilation/airDistribution/temperatureDifference":{
        formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")',
        message:0,
        triggers:["home/state/ventilation/airDistribution/temperatureSupplyAir","home/state/ventilation/airDistribution/temperatureExhaustAir"],
        calc: "{{home/state/ventilation/airDistribution/temperatureSupplyAir}} - {{home/state/ventilation/airDistribution/temperatureExhaustAir}}",
        logger:{
            condition:"none"
        }
    },
    //"home/state/ventilation/intakeAirHeatExchanger/temperatureUpperThreshold":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    //"home/state/ventilation/intakeAirHeatExchanger/temperatureLowerThreshold":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," °C")'},
    //"home/state/ventilation/intakeAirHeatExchanger/modeHeatExchanger":{},
    "home/state/ventilation/intakeAirBypass/modeBypass":{},
    
    //df_strom
    
    "home/state/metering/powermeter/powerActual":{formatter:'concat(format(v/10,{notation: "fixed", precision: 1})," W")'},
    "home/state/metering/powermeter/counterEnergyConsumptionTotal":{},
    "home/state/metering/powermeter/counterEnergyConsumptionLastDay":{},
    "home/state/metering/powermeter/counterEnergyConsumptionLastMonth":{},    
    "home/state/metering/powermeter/counterEnergyConsumptionLastYear":{},
    "home/state/metering/powermeter/counterEnergyFeedInTotal":{},    
    "home/state/metering/powermeter/counterEnergyFeedInLastDay":{}, 
    "home/state/metering/powermeter/counterEnergyFeedInTotalLastMonth":{}, 
    "home/state/metering/powermeter/counterEnergyFeedInTotalLastYear":{},     
    "home/state/metering/powermeter/counterConsumptionLastDay":{
        formatter:'concat(format(v/10000,{notation: "fixed", precision: 2})," kWh/d")',        
        message:0,
        triggers:["home/state/metering/powermeter/counterEnergyConsumptionTotal","home/state/metering/powermeter/counterEnergyConsumptionLastDay"],
        calc: "{{home/state/metering/powermeter/counterEnergyConsumptionTotal}} - {{home/state/metering/powermeter/counterEnergyConsumptionLastDay}}",
        logger:{
            condition:"none"
        }
    },    
    "home/state/metering/powermeter/counterFeedInLastDay":{
        formatter:'concat(format(v/10000,{notation: "fixed", precision: 2})," kWh/d")',        
        message:0,
        triggers:["home/state/metering/powermeterPV/counterEnergyFeedInTotal","home/state/metering/powermeterPV/counterEnergyFeedInLastDay"],
        calc: "{{home/state/metering/powermeterPV/counterEnergyFeedInTotal}} - {{home/state/metering/powermeterPV/counterEnergyFeedInLastDay}}",
        logger:{
            condition:"none"
        }
    },
    "home/state/metering/powermeter/counterFeedInLastMonth":{
        formatter:'concat(format(v/10000,{notation: "fixed", precision: 2})," kWh/m")',        
        message:0,
        triggers:["home/state/metering/powermeterPV/counterEnergyFeedInTotal","home/state/metering/powermeter/counterEnergyFeedInTotalLastMonth"],
        calc: "{{home/state/metering/powermeterPV/counterEnergyFeedInTotal}} - {{home/state/metering/powermeter/counterEnergyFeedInTotalLastMonth}}",
        logger:{
            condition:"none"
        }
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