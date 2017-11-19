/* 
 * AM2H V.2.0.0 (c)2017 
 */

// Formatierunsoptionen

var color = new CssRules()
    .add("red","{{home/state/heating/vitotronic/modeHeaterValve:message}}==1")
    .add("yellow","{{home/state/heating/vitotronic/modeHeaterValve:message}}!=1")        
;

function initFields(){
    const c = new Container("#contentlayer")
        .setBgImage({"background-image": "url(\"http://clicca.de/TempEGV2_image.svg\")",
            "width": "1030px","height": "620px","background-size": "1030px 620px"})
        
        .box("home/state/heating/vitotronic/temperatureOutside:formattedMessage","width: 56px; left: 158px; top: 311px;")
        //.box("home/state/heating/upperFloor/temperatureSupplyFlow:formattedMessage","width: 56px; left: 127px; top: 111px;")
        //.box("home/state/heating/upperFloor/temperatureReturnFlow:formattedMessage","width: 56px; left: 127px; top: 203px;")            
        //.box("home/calc/heating/upperFloor/temperatureDifference:formattedMessage","width: 46px; left:  180px; top: 156px;")
        //.box("home/state/heating/upperFloor/temperatureReturnFlowGast:formattedMessage","width: 56px; left: 561px; top: 201px;",color)
        //.box("home/state/heating/upperFloor/temperatureReturnFlowToilette:formattedMessage","width: 46px; left: 488px; top: 185px;",color)
        //.box("home/state/heating/upperFloor/temperatureReturnFlowKind:formattedMessage","width: 56px; left: 340px; top: 201px;",color)
        //.box("home/state/heating/upperFloor/temperatureReturnFlowSchlafen:formattedMessage","width: 56px; left: 470px; top: 331px;",color)
        //.box("home/state/heating/upperFloor/temperatureReturnFlowBadA:formattedMessage","width: 56px; left: 600px; top: 415px;",color)
        //.box("home/state/heating/upperFloor/temperatureReturnFlowBadB:formattedMessage","width: 56px; left: 600px; top: 440px;",color)
        //.box("home/state/heating/upperFloor/temperatureReturnFlowBadHK:formattedMessage","width: 56px; left: 600px; top: 335px;",color)
        //.box("home/state/heating/upperFloor/temperatureReturnFlowFlur:formattedMessage","width: 56px; left: 340px; top: 300px;",color)
        .box("home/state/location/Technikraum/temperature:formattedMessage","width: 56px; left: 808px; top: 400px;")
        .box("home/state/location/Technikraum/humitidy:formattedMessage","width: 56px; left: 808px; top: 425px;")
        .box("home/calc/metering/gasmeter/counterEnergyHActualDay:formattedMessage","width: 88px; left:  126px; top: 341px;")
        .box("home/calc/metering/gasmeter/counterEnergyHActualMonth:formattedMessage","width: 88px; left:  126px; top: 366px;")
        .box("home/calc/metering/gasmeter/counterEnergyHActualYear:formattedMessage","width: 88px; left:  126px; top: 391px;")

        .start();
    
    // console.log(c);
}
