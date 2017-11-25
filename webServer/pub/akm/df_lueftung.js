/* 
 * AM2H V.2.0.0 (c)2017 
 */

// Formatierunsoptionen

var color1 = new CssRules()
    .add("red","{{home/calc/ventilation/airDistribution/temperatureDifference:message}}>0")
    .add("blue","{{home/calc/ventilation/airDistribution/temperatureDifference:message}}<=0")
;    
    
var color2 = new CssRules()    
    .add("purple","{{home/state/ventilation/airHeatExchanger/limitUpperTemp:message}}")
    .add("purple","{{home/state/ventilation/airHeatExchanger/limitLowerTemp:message}}")
;

var valve1 = new CssRules()
    .setInitClass("valve1")
    .add("manAir","{{home/state/ventilation/airHeatExchanger/modeHeatExchanger:message}} == 1")
    .add("manEarth","{{home/state/ventilation/airHeatExchanger/modeHeatExchanger:message}} == 2")
    .add("autoAir","{{home/state/ventilation/airHeatExchanger/modeHeatExchanger:message}} == 3")
    .add("autoEarth","{{home/state/ventilation/airHeatExchanger/modeHeatExchanger:message}} == 4")
    .add("offline" ,"{{home/state/ventilation/airHeatExchanger/modeHeatExchanger:message}} == 5")       
;

var valve2 = new CssRules()
    .setInitClass("valve2")
    .add("manBypassClosed","{{home/state/ventilation/airBypass/modeBypass:message}} == 1")
    .add("manBypassOpened","{{home/state/ventilation/airBypass/modeBypass:message}} == 2")
    .add("autoBypassClosed","{{home/state/ventilation/airBypass/modeBypass:message}} == 3")
    .add("autoBypassOpenend","{{home/state/ventilation/airBypass/modeBypass:message}} == 4")
           
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
        .box("home/calc/ventilation/airDistribution/temperatureDifference:formattedMessage","width: 56px; left:  795px; top: 386px;",color1)
        .box("home/state/ventilation/airHeatExchanger/limitUpperTemp:formattedMessage","width: 56px; left: 237px; top: 518px;",color2)
        .box("home/state/ventilation/airHeatExchanger/limitLowerTemp:formattedMessage","width: 56px; left: 237px; top: 542px;",color2)
        .box("","left: 186px; top: 415px;",valve1)
        .box("","left: 391px; top: 428px;",valve2)

        .start();
    
    // console.log(c);
}