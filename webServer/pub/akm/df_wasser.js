/* 
 * AM2H V.2.0.0 (c)2017 
 */

// Formatierunsoptionen

var color = new CssRules()
    .add("red","{{home/state/ventilation/airDistribution/temperatureDifference:message}}>0")
    .add("blue","{{home/state/ventilation/airDistribution/temperatureDifference:message}}<=0")
;

function initFields(){
    const c = new Container("#contentlayer")
        .setBgImage({"background-image": "url(\"http://clicca.de/WasserV2_image.svg\")",
            "width": "1030px","height": "620px","background-size": "1030px 620px"})
        .box("home/state/heating/vitotronic/temperatureOutside:formattedMessage","width: 56px; left: 54px; top: 307px;")
        .box("home/state/heating/vitotronic/temperatureWater:formattedMessage","width: 48px; left: 633px; top: 440px;")
        .box("home/state/heating/vitotronic/temperatureSupplyFlow:formattedMessage","width: 56px; left: 765px; top: 450px;")
        .box("home/state/heating/vitotronic/temperatureReturnFlow:formattedMessage","width: 56px; left: 765px; top: 542px;")
        .box("home/calc/metering/gasmeter/counterEnergyWActualDay:formattedMessage","width: 78px; left:  511px; top: 386px;")
        .box("home/calc/metering/gasmeter/counterEnergyWActualMonth:formattedMessage","width: 78px; left:  511px; top: 410px;")
        .box("home/calc/metering/gasmeter/counterEnergyWShare:formattedMessage","width: 46px; left:  810px; top: 496px;",)

        .start();
    
    // console.log(c);
}