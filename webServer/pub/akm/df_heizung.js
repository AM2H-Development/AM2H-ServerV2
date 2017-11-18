/* 
 * AM2H V.2.0.0 (c)2017 
 */

// Formatierunsoptionen

var lower = new CssRules()
    .add("red","{{home/state/heating/vitotronic/temperatureOutside:message}}>0")
    .add("blue","{{home/state/heating/vitotronic/temperatureOutside:message}}<=0")
;

var toggle = new CssRules()
    .add("red",  "mod(floor({{home/event/timer/seconds:ts}}/1000), 2) != 0")
    .add("green","mod(floor({{home/event/timer/seconds:ts}}/1000), 2) == 0")
;

var bulp = new CssRules()
    .setInitClass("bulp")
    .add("on" ,"{{mh/l/lamp/state:message}} != 0")
    .add("off","{{mh/l/lamp/state:message}} == 0")
;

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
        .box("home/state/heating/vitotronic/temperatureOutside:formattedMessage","width: 56px; left: 54px; top: 307px;",lower)
        .box("home/state/heating/vitotronic/temperatureSetpoint:formattedMessage","width: 56px; left: 442px; top: 332px;")
        .box("home/state/heating/vitotronic/temperatureSupplyFlow:formattedMessage","width: 56px; left: 442px; top: 399px;")
        .box("home/state/heating/vitotronic/temperatureReturnFlow:formattedMessage","width: 56px; left: 622px; top: 388px;")
        .box("home/state/heating/vitotronic/temperatureWater:formattedMessage","width: 48px; left: 310px; top: 450px;")
        .box("home/state/heating/vitotronic/powerBurner:formattedMessage","width: 56px; left: 622px; top: 332px;")
        .box("home/state/heating/vitotronic/powerPump:formattedMessage","width: 56px; left: 622px; top: 363px;")

        .box("home/state/metering/gasmeter/powerActual:formattedMessage","width: 56px; left: 325px; top: 332px;")
        .box("home/state/metering/gasmeter/counterConsumptionActualDay:formattedMessage","width: 78px; left:  203px; top: 362px;")
        .box("home/state/metering/gasmeter/counterConsumptionActualMonth:formattedMessage","width: 78px; left:  203px; top: 386px;")
        .box("home/state/metering/gasmeter/counterConsumptionActualYear:formattedMessage","width: 78px; left:  203px; top: 416px;")

        .box("home/state/heating/manifoldUpperFloor/temperatureSupplyFlow:formattedMessage","width: 56px; left: 618px; top: 152px;")
        .box("home/state/heating/manifoldUpperFloor/temperatureReturnFlow:formattedMessage","width: 56px; left: 618px; top: 244px;")
        .box("home/state/heating/manifoldUpperFloor/temperatureDifference:formattedMessage","width: 46px; left: 577px; top: 199px;")
        .box("","left: 563px; top: 407px;",valve)


        
            
        //.box("home/event/timer/seconds:ts","width: 80px; left:  10px; top: 90px;")
        //.box("home/event/timer/seconds:formattedMessage","width: 300px; left:  10px; top: 130px;")
        //.box("home/event/timer/minutes:formattedMessage","width: 300px; left:  10px; top: 170px;",toggle)
        //.box("","left:  10px; top: 210px;",bulp,"emit('mh/l/lamp/state',mathEval('({{mh/l/lamp/state:message}}==0)?\\'1\\':\\'0\\' '));")
        //.box("","left:  10px; top: 250px;","bulp on", "emit('mh/l/lamp/state',1); mathEval('{{mh/l/lamp/state:message}}');")
        //.box("","left:  60px; top: 250px;","bulp off","emit('mh/l/lamp/state',0); mathEval('{{mh/l/lamp/state:message}}');")
        //.inp("home/event/timer/seconds:formattedMessage","width: 300px; left:  10px; top: 320px;")

        .start();
    
    // console.log(c);
}