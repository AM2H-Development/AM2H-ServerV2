/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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

const t = require('../../topicsLogger');

// Heizung

t.addLogger({topic:"home/state/heating/vitotronic/temperatureOutside",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/vitotronic/temperatureSetpoint",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/vitotronic/temperatureSupplyFlow",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/vitotronic/temperatureReturnFlow",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/vitotronic/temperatureWater",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/vitotronic/modeHeaterValve",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/vitotronic/modeWaterCirculationPump",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/vitotronic/powerBurner",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/vitotronic/powerPump",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/vitotronic/counterBurnerStarts",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});



t.addLogger({topic:"home/state/metering/gasmeter/powerActual",condition:"every",interval:150}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/gasmeter/counterConsumptionTotal",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/gasmeter/counterConsumptionLastDay",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/gasmeter/counterConsumptionLastMonth",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/gasmeter/counterConsumptionLastYear",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});

// Lueftung

t.addLogger({topic:"home/state/ventilation/airDistribution/temperatureSupplyAir",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/ventilation/airDistribution/humiditySupplyAir",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/ventilation/airDistribution/temperatureExhaustAir",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/ventilation/airDistribution/humidityExhaustAir",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/ventilation/polling/humitidyOutsideAir",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/ventilation/intakeAirHeatExchanger/temperatureLowerThreshold",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/ventilation/intakeAirHeatExchanger/temperatureUpperThreshold",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/ventilation/intakeAirHeatExchanger/modeHeatExchanger",condition:"all",newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/ventilation/intakeAirBypass/modeBypass",condition:"all",newonly:true}).addCleanup({unit:"years",lifespan:10});

// Strom

t.addLogger({topic:"home/state/metering/powermeter/powerActual",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeter/counterEnergyConsumptionTotal",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeter/counterEnergyFeedInTotal",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeter/counterEnergyConsumptionLastDay",condition:"all",newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeter/counterEnergyFeedInLastDay",condition:"all",neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeter/counterEnergyConsumptionLastMonth",condition:"all",newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeter/counterEnergyFeedInTotalLastMonth",condition:"all",neonly:true}).addCleanup({unit:"years",lifespan:10});

t.addLogger({topic:"home/state/metering/powermeterPV/powerActual",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeterPV/counterEnergyConsumptionTotal",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeterPV/counterEnergyFeedInTotal",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeterPV/counterEnergyConsumptionLastDay",condition:"all",newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeterPV/counterEnergyFeedInLastDay",condition:"all",neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeterPV/counterEnergyConsumptionLastMonth",condition:"all",newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/powermeterPV/counterEnergyFeedInTotalLastMonth",condition:"all",neonly:true}).addCleanup({unit:"years",lifespan:10});



// Temperaturen EG

t.addLogger({topic:"home/state/location/Technikraum/temperature",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/location/Technikraum/humitidy",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});


// Temperaturen OG

t.addLogger({topic:"home/state/heating/manifoldUpperFloor/temperatureSupplyFlow",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/manifoldUpperFloor/temperatureReturnFlow",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/manifoldUpperFloor/temperatureReturnFlowGast",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/manifoldUpperFloor/temperatureReturnFlowToilette",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/manifoldUpperFloor/temperatureReturnFlowKind",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/manifoldUpperFloor/temperatureReturnFlowSchlafen",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/manifoldUpperFloor/temperatureReturnFlowBad-A",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/manifoldUpperFloor/temperatureReturnFlowBad-B",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/manifoldUpperFloor/temperatureReturnFlowBad-Heizkoerper",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/heating/manifoldUpperFloor/temperatureReturnFlowFlur",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});

// Wasser

t.addLogger({topic:"home/state/metering/gasmeter/counterConsumptionWarmWaterTotal",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/gasmeter/counterConsumptionWarmWaterLastDay",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/gasmeter/counterConsumptionWarmWaterLastMonth",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"home/state/metering/gasmeter/counterConsumptionWarmWaterLastYear",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});

/*


t.addLogger({topic:"mh/location/raum1/state/humidity",condition:"onEvent",trigger:"mh/location/raum1/state/switch"});
t.addCleanup({topic:"mh/event/timer/seconds",unit:"seconds",lifespan:30});

t.addLogger({topic:"mh/event/timer/dawn",condition:"all"});

t.addLogger({topic:"mh/event/timer/dusk",condition:"all"});

*/