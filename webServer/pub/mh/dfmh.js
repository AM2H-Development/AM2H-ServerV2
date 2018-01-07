/* 
 * AM2H V.2.0.0 (c)2017 
 */

// Formatierunsoptionen

var cls = new CssRules()
    .add("red","{{mh/event/timer/seconds:ts}}>0")
    .add("green","{{mh/event/timer/seconds:message}}<0")
    .add("blue","{{mh/event/timer/seconds:ts}}+{{mh/event/a:ts}}>0")
;

var toggle = new CssRules()
    .add("red",  "mod(floor({{mh/event/timer/seconds:ts}}/1000), 2) != 0")
    .add("green","mod(floor({{mh/event/timer/seconds:ts}}/1000), 2) == 0")
;

var bulp = new CssRules()
    .setInitClass("bulp")
    .add("on" ,"{{mh/l/lamp/state:message}} != 0")
    .add("off","{{mh/l/lamp/state:message}} == 0")
;

function initFields(){
    const c = new Container("#contentlayer")
        .setBgImage({"background-image": "url(\"http://qxf.de/HeizungV2_image.svg\")",
            "width": "1030px","height": "620px","background-size": "1030px 620px"})
        .box("mh/event/timer/seconds:message","width: 230px; left:  10px; top: 50px;","df green")
        .box("mh/event/timer/seconds:ts","width: 80px; left:  10px; top: 90px;",cls)
        .box("mh/event/timer/seconds:formattedMessage","width: 300px; left:  10px; top: 130px;")
        .box("mh/event/timer/minutes:formattedMessage","width: 300px; left:  10px; top: 170px;",toggle)

        .box("","left:  50px; top: 210px;",bulp,"chart(this);")

        .box("","left:  10px; top: 210px;",bulp,"emit('mh/l/lamp/state',mathEval('({{mh/l/lamp/state:message}}==0)?\\'1\\':\\'0\\' '));")
        .box("","left:  10px; top: 250px;","bulp on", "emit('mh/l/lamp/state',1); mathEval('{{mh/l/lamp/state:message}}');")
        .box("","left:  60px; top: 250px;","bulp off","emit('mh/l/lamp/state',0); mathEval('{{mh/l/lamp/state:message}}');")
        .inp("mh/event/timer/seconds:formattedMessage","width: 300px; left:  10px; top: 320px;")

        .start();

    const d = new Diagram("#myChart","#dia")
            .duration("1 Stunde",{'days' : 1})
            .duration("1 Woche",{'weeks' : 1})
            .graph("Sekunden","mh/event/timer/seconds","")
            .graph("Minuten 1","mh/event/timer/minutes","")
            .graph("Minuten 2","mh/event/timer/minutes","")
            .graph("Minuten 3","mh/event/timer/minutes","")
            .graph("Minuten 4","mh/event/timer/minutes","")
        
            .start();
}