/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

var cp1 = function(a){
    var val = v.asF(a[0])-v.asF(a[1]);
    return val;
};

var cp2 = function(a){
    var val = ((v.asF(a[0])-v.asF(a[1]))-(v.asF(a[2])-v.asF(a[3]))) * 10;
    return val;
};

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage({
        "background-image": "url(\"http://clicca.de/TempEGV2_image.svg\")",
        "width": "1030px",
        "height": "620px",
        "background-size": "1030px 620px"
            });
    c.setDefaultValue("wait..");
    
    c.addDF({   topics: ["home/state/heating/vitotronic/temperatureOutside"],
                style: "width: 56px; left: 158px; top: 311px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });    
    
    c.addDF({   topics: ["home/state/location/Technikraum/temperature"],
                style: "width: 56px; left: 808px; top: 400px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
        c.addDF({   topics: ["home/state/location/Technikraum/humitidy"],
                style: "width: 56px; left: 808px; top: 425px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });     
            
    c.addDF({   topics: ["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastDay","home/state/metering/gasmeter/counterConsumptionWarmWaterTotal","home/state/metering/gasmeter/counterConsumptionWarmWaterLastDay"],
                style: "width: 78px; left:  136px; top: 341px;",
                unit: " kWh/d",
                renderer: re.none,
                compute: cp2,
                prescale: 100,
                fraction: 1
            });
            
    c.addDF({   topics: ["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastMonth","home/state/metering/gasmeter/counterConsumptionWarmWaterTotal","home/state/metering/gasmeter/counterConsumptionWarmWaterLastMonth"],
                style: "width: 78px; left:  136px; top: 366px;",
                unit: " kWh/m",
                renderer: re.none,
                compute: cp2,
                prescale: 100,
                fraction: 0
            });                  
            
}    