/* 
 * AM2H V.2.0.0 (c)2017 
 */

// Formatierunsoptionen

var valve = new CssRules()
    .setInitClass("valve")
    .add("heating" ,"{{home/state/heating/vitotronic/modeHeaterValve:message}} == 1")
    .add("water","{{home/state/heating/vitotronic/modeHeaterValve:message}} == 3")
    .add("fill","{{home/state/heating/vitotronic/modeHeaterValve:message}} == 2")
;


function initFields(){
    const c = new Container("#contentlayer")
        .setBgImage({"background-image": "url(\"http://clicca.de/HeizungV2_image.svg\")",
            "width": "1030px","height": "620px","background-size": "1030px 620px"})
        .box("home/state/heating/vitotronic/temperatureOutside:formattedMessage","width: 56px; left: 54px; top: 307px;")
        .box("home/state/heating/vitotronic/temperatureSetpoint:formattedMessage","width: 56px; left: 442px; top: 332px;")
        .box("home/state/heating/vitotronic/temperatureSupplyFlow:formattedMessage","width: 56px; left: 442px; top: 399px;")
        .box("home/state/heating/vitotronic/temperatureReturnFlow:formattedMessage","width: 56px; left: 622px; top: 388px;")
        .box("home/state/heating/vitotronic/temperatureWater:formattedMessage","width: 48px; left: 310px; top: 450px;")
        .box("home/state/heating/vitotronic/powerBurner:formattedMessage","width: 56px; left: 622px; top: 332px;")
        .box("home/state/heating/vitotronic/powerPump:formattedMessage","width: 56px; left: 622px; top: 363px;")
        .box("home/calc/heating/vitotronic/counterBurnerStartsActualDay:formattedMessage","width: 56px; left: 622px; top: 422px;")

        .box("home/state/metering/gasmeter/powerActual:formattedMessage","width: 56px; left: 325px; top: 332px;")
        .box("home/calc/metering/gasmeter/counterConsumptionActualDay:formattedMessage","width: 78px; left:  203px; top: 362px;")
        .box("home/calc/metering/gasmeter/counterConsumptionActualMonth:formattedMessage","width: 78px; left:  203px; top: 386px;")
        .box("home/calc/metering/gasmeter/counterConsumptionActualYear:formattedMessage","width: 78px; left:  203px; top: 416px;")

        .box("home/state/heating/lowerFloor/temperatureSupplyFlow:formattedMessage","width: 56px; left: 764px; top: 450px;")
        .box("home/state/heating/lowerFloor/temperatureReturnFlow:formattedMessage","width: 56px; left: 764px; top: 541px;")
        .box("home/calc/heating/lowerFloor/temperatureDifference:formattedMessage","width: 46px; left: 814px; top: 496px;")
            
        .box("home/state/heating/upperFloor/temperatureSupplyFlow:formattedMessage","width: 56px; left: 618px; top: 152px;")
        .box("home/state/heating/upperFloor/temperatureReturnFlow:formattedMessage","width: 56px; left: 618px; top: 244px;")
        .box("home/calc/heating/upperFloor/temperatureDifference:formattedMessage","width: 46px; left: 577px; top: 199px;")
        .box("","left: 563px; top: 407px;",valve)

        .start();
    
    // console.log(c);
}