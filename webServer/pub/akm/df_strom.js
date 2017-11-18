/* 
 * AM2H V.2.0.0 (c)2017 
 */

// Formatierunsoptionen

var lower = new CssRules()
    .add("red","{{home/state/heating/vitotronic/temperatureOutside:message}}>0")
    .add("blue","{{home/state/heating/vitotronic/temperatureOutside:message}}<=0")
;

function initFields(){
    const c = new Container("#contentlayer")
        .setBgImage({"background-image": "url(\"http://clicca.de/StromV2_image.svg\")",
            "width": "1030px","height": "620px","background-size": "1030px 620px"})
        .box("home/state/heating/vitotronic/temperatureOutside:formattedMessage","width: 56px; left: 54px; top: 307px;")
        .box("home/state/metering/powermeter/powerActual:formattedMessage","width: 78px; left: 208px; top: 355px;")
        .box("home/state/metering/powermeter/counterEnergyConsumptionActualLastDay:formattedMessage","width: 88px; left: 198px; top: 386px;")
        .box("home/state/metering/powermeter/counterEnergyFeedInActualLastDay:formattedMessage","width: 88px; left: 198px; top: 410px;")
        .box("home/state/metering/powermeter/counterEnergyFeedInActualLastMonth","width: 88px; left: 198px; top: 441px;")
        .box("home/state/heating/vitotronic/powerBurner:formattedMessage","width: 56px; left: 622px; top: 332px;")
        .box("home/state/heating/vitotronic/powerPump:formattedMessage","width: 56px; left: 622px; top: 363px;")




        
            
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