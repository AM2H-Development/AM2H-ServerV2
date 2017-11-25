/* 
 * AM2H V.2.0.0 (c)2017 
 */

// Formatierunsoptionen

var color1 = new CssRules()
    .add("green","{{home/state/metering/powermeter/powerActual:message}}<0")
    .add("yellow","{{home/state/metering/powermeter/powerActual:message}}>=0")
;

var color2 = new CssRules()
    .add("green","{{home/state/metering/powermeterPV/powerActual:message}}<0")
    .add("yellow","{{home/state/metering/powermeterPV/powerActual:message}}>=0")        
;

function initFields(){
    const c = new Container("#contentlayer")
        .setBgImage({"background-image": "url(\"http://clicca.de/StromV2_image.svg\")",
            "width": "1030px","height": "620px","background-size": "1030px 620px"})
        .box("home/state/heating/vitotronic/temperatureOutside:formattedMessage","width: 56px; left: 54px; top: 307px;")
        .box("home/state/metering/powermeter/powerActual:formattedMessage","width: 78px; left: 208px; top: 355px;",color1)
        .box("home/state/metering/powermeterPV/powerActual:formattedMessage","width: 78px; left: 432px; top: 355px;",color2)
        .box("home/calc/metering/powermeter/powerConsumptionActual:formattedMessage","width: 78px; left:  208px; top: 209px;")

        .box("home/calc/metering/powermeter/counterConsumptionTotalDay:formattedMessage","width: 88px; left:  198px; top: 240px;")
        .box("home/calc/metering/powermeter/counterConsumptionActualDay:formattedMessage","width: 88px; left: 198px; top: 386px;")
        .box("home/calc/metering/powermeter/counterFeedInActualDay:formattedMessage","width: 88px; left: 198px; top: 410px;")
        .box("home/calc/metering/powermeter/counterFeedInActualMonth:formattedMessage","width: 88px; left: 198px; top: 441px;")
        .box("home/calc/metering/powermeter/counterShare:formattedMessage","width: 78px; left:  208px; top: 525px;")

        .box("home/calc/metering/powermeterPV/counterConsumptionActualDay:formattedMessage","width: 88px; left: 422px; top: 386px;")
        .box("home/calc/metering/powermeterPV/counterFeedInActualDay:formattedMessage","width: 88px; left: 422px; top: 410px;")
        .box("home/calc/metering/powermeterPV/counterFeedInActualMonth:formattedMessage","width: 88px; left: 422px; top: 441px;")

        .start();
    
    // console.log(c);
}