/* 
 * AM2H V.2.0.0 (c)2017 
 */

// Formatierunsoptionen

var color = new CssRules()
    .add("red","{{home/state/ventilation/airDistribution/temperatureDifference:message}}>0")
    .add("blue","{{home/state/ventilation/airDistribution/temperatureDifference:message}}<=0")
;

var valve1 = new CssRules()
    .setInitClass("valve1")
    .add("manAir","{{home/state/ventilation/intakeAirHeatExchanger/modeHeatExchanger}} == 1")
    .add("manEarth","{{home/state/ventilation/intakeAirHeatExchanger/modeHeatExchanger}} == 2")
    .add("autoAir","{{home/state/ventilation/intakeAirHeatExchanger/modeHeatExchanger}} == 3")
    .add("autoEarth","{{home/state/ventilation/intakeAirHeatExchanger/modeHeatExchanger}} == 4")
    .add("offline" ,"{{home/state/ventilation/intakeAirHeatExchanger/modeHeatExchanger}} == 5")       
;

var valve2 = new CssRules()
    .setInitClass("valve2")
    .add("manBypassClosed","{{home/state/ventilation/intakeAirBypass/modeBypass}} == 1")
    .add("manBypassOpened","{{home/state/ventilation/intakeAirBypass/modeBypass}} == 2")
    .add("autoBypassClosed","{{home/state/ventilation/intakeAirBypass/modeBypass}} == 3")
    .add("autoBypassOpenend","{{home/state/ventilation/intakeAirBypass/modeBypass}} == 4")
           
;


function initFields(){
    const c = new Container("#contentlayer")
        .setBgImage({"background-image": "url(\"http://clicca.de/LueftungV2_image.svg\")",
            "width": "1030px","height": "620px","background-size": "1030px 620px"})
        .box("home/state/heating/vitotronic/temperatureOutside:formattedMessage","width: 56px; left: 54px; top: 307px;")
        .box("home/state/ventilation/polling/humitidyOutsideAir:formattedMessage","width: 56px; left: 54px; top: 331px;")
        .box("home/state/ventilation/airDistribution/temperatureSupplyAir:formattedMessage","width: 56px; left: 689px; top: 408px;")
        .box("home/state/ventilation/airDistribution/humiditySupplyAir:formattedMessage","width: 56px; left: 689px; top: 432px;")
        .box("home/state/ventilation/airDistribution/temperatureExhaustAir:formattedMessage","width: 56px; left: 689px; top: 341px;")
        .box("home/state/ventilation/airDistribution/humidityExhaustAir:formattedMessage","width: 56px; left: 689px; top: 365px;")
        .box("home/calc/ventilation/airDistribution/temperatureDifference:formattedMessage","width: 56px; left:  795px; top: 386px;",color)
        //.box("home/state/ventilation/intakeAirHeatExchanger/temperatureUpperThreshold","width: 56px; left: 237px; top: 518px;")
        //.box("home/state/ventilation/intakeAirHeatExchanger/temperatureLowerThreshold","width: 56px; left: 237px; top: 542px;")
        .box("","left: 186px; top: 415px;",valve1)
        .box("","left: 391px; top: 428px;",valve2)

        .start();
    
    // console.log(c);
}