/* 
 * AM2H V.2.0.0 (c)2017 
 */

// Formatierunsoptionen

var cls = new CssRules()
    .add("red","{{mh/event/timer/seconds:ts}}>0")
    .add("green","{{mh/event/timer/seconds:message}}<0")
    .add("blue","{{mh/event/timer/seconds:ts}}+{{mh/event/a:ts}}>0")
;

var i= [
    ["/bild1.svg","{{topic}}==0"],
    ["/bild2.svg","{{topic}}==1"],
    ["/bild3.svg","{{topic}}==2"]
];

function img(cls,pos,icons,onClick=""){}
function input(style,val){}

function initFields(){
    const c = new Container("#contentlayer")
        .setBgImage({
            "background-image": "url(\"http://qxf.de/HeizungV2_image.svg\")",
            "width": "1030px",
            "height": "620px",
            "background-size": "1030px 620px"
        })
        .box("mh/event/timer/seconds:message","width: 230px; left:  10px; top: 50px;","wait")
        .box("mh/event/timer/seconds:ts","width: 80px; left:  10px; top: 70px;",cls)
        .box("mh/event/timer/seconds:formattedMessage","width: 300px; left:  10px; top: 90px;")
        .start();
    
    // console.log(c);
}