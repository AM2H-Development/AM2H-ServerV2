/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

var re1 = function (id, a, style) {
    var val1 = v.asI(a[0]);
    var val2 = v.asI(a[1]);
    if (val1 !== 1) {
        style += "background-color: #FFCDD2;";
    } else {
        style += "background-color: lightyellow;";
    }
    return "<div class=\"df\" id=\"" + id + "\" style=\"" + style + "\">" + val2 + "</div>";
};

var cp1 = function (a) {
    var val = v.asI(a[0]) - v.asI(a[1]);
    return val;
};

var cp2 = function (a) {
    var val = ((v.asI(a[0]) - v.asI(a[1])) - (v.asI(a[2]) - v.asI(a[3]))) * 10;
    return val;
};

var cp3 = function (a) {
    var val = v.asI(a[1]);
    return val;
};


/*var image1 = function (id, a, style) {
    var icon = "<img src=\"" + "/icons/Heizung_OG_(off)_icon.svg" + "\" onclick=\"" + onclick + "\">";
    var val0 = v.asI(a[0]);
    var val1 = v.asI(a[1]);
    var val2 = v.asI(a[2]);
    if (val0 === 3 && val1 === 0 && val2 === 0) {
        var icon = "<img src=\"" + "/icons/Heizung_OG_(standby)_icon.svg" + "\" onclick=\"" + onclick + "\">";
    }
    if (val1 === 3 && val2 !== 0 && val2 !== 0) {
        var icon = "<img src=\"" + "/icons/Heizung_OG_(on)_icon.svg" + "\" onclick=\"" + onclick + "\">";
    }
    return "<div style=\"position: absolute;" + style + "\" id=\"" + id + "\">" + icon + "</div>";
};*/

function initFields() {
    c.setContext("#contentlayer");
    c.setBgImage({
        "background-image": "url(\"http://clicca.de/TempOGV2_image.svg\")",
        "width": "1030px",
        "height": "620px",
        "background-size": "1030px 620px"
    });
    c.setDefaultValue("wait..");

/*    c.addDF({topics: ["home/state/heating/vitotronic/modeHeaterValve","home/state/heating/vitotronic/powerPump", "home/state/heating/vitotronic/powerBurner"],
        style: "width: 100px; left: 50px; top: 500px;",
        unit: "",
        //renderer: image1,
        prescale: 1,
        fraction: 1
    }); */

    c.addDF({topics: ["home/state/heating/vitotronic/temperatureOutside"],
        style: "width: 56px; left: 158px; top: 311px;",
        unit: " °C",
        renderer: re.clickable,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/heating/vitotronic/modeHeaterValve", "home/state/heating/manifoldUpperFloor/temperatureReturnFlowGast"],
        style: "width: 56px; left: 561px; top: 201px;",
        unit: " °C",
        //renderer: re.clickable,
        renderer: re1,
        compute: cp3,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/heating/manifoldUpperFloor/temperatureReturnFlowToilette", "home/state/heating/vitotronic/modeHeaterValve"],
        style: "width: 46px; left: 488px; top: 185px;",
        unit: " °C",
        renderer: re.clickable,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/heating/manifoldUpperFloor/temperatureReturnFlowKind", "home/state/heating/vitotronic/modeHeaterValve"],
        style: "width: 56px; left: 340px; top: 201px;",
        unit: " °C",
        renderer: re.clickable,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/heating/manifoldUpperFloor/temperatureReturnFlowSchlafen", "home/state/heating/vitotronic/modeHeaterValve"],
        style: "width: 56px; left: 470px; top: 331px;",
        unit: " °C",
        renderer: re.clickable,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/heating/manifoldUpperFloor/temperatureReturnFlowBad-A", "home/state/heating/vitotronic/modeHeaterValve"],
        style: "width: 56px; left: 600px; top: 415px;",
        unit: " °C",
        renderer: re.clickable,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/heating/manifoldUpperFloor/temperatureReturnFlowBad-B", "home/state/heating/vitotronic/modeHeaterValve"],
        style: "width: 56px; left: 600px; top: 440px;",
        unit: " °C",
        renderer: re.clickable,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/heating/manifoldUpperFloor/temperatureReturnFlowBad-Heizkoerper", "home/state/heating/vitotronic/modeHeaterValve"],
        style: "width: 56px; left: 600px; top: 335px;",
        unit: " °C",
        renderer: re.clickable,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/heating/manifoldUpperFloor/temperatureSupplyFlow"],
        style: "width: 56px; left: 127px; top: 111px;",
        unit: " °C",
        renderer: re.clickable,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/heating/manifoldUpperFloor/temperatureReturnFlow"],
        style: "width: 56px; left: 127px; top: 203px;",
        unit: " °C",
        renderer: re.clickable,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/heating/manifoldUpperFloor/temperatureSupplyFlow", "home/state/heating/manifoldUpperFloor/temperatureReturnFlow"],
        style: "width: 46px; left:  180px; top: 156px;",
        unit: " °C",
        renderer: re.none,
        compute: cp1,
        prescale: 10,
        fraction: 1
    });

    c.addDF({topics: ["home/state/metering/gasmeter/counterConsumptionTotal", "home/state/metering/gasmeter/counterConsumptionLastDay", "home/state/metering/gasmeter/counterConsumptionWarmWaterTotal", "home/state/metering/gasmeter/counterConsumptionWarmWaterLastDay"],
        style: "width: 78px; left:  136px; top: 341px;",
        unit: " kWh/d",
        renderer: re.none,
        compute: cp2,
        prescale: 100,
        fraction: 1
    });

    c.addDF({topics: ["home/state/metering/gasmeter/counterConsumptionTotal", "home/state/metering/gasmeter/counterConsumptionLastMonth", "home/state/metering/gasmeter/counterConsumptionWarmWaterTotal", "home/state/metering/gasmeter/counterConsumptionWarmWaterLastMonth"],
        style: "width: 78px; left:  136px; top: 366px;",
        unit: " kWh/m",
        renderer: re.none,
        compute: cp2,
        prescale: 100,
        fraction: 0
    });

}