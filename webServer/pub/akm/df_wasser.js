/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

var cp1 = function(a){
  if (v.asI(a[1]==1)) return "-";    
    return v.asI(a[0]);
};

var cp2 = function(a){
    var val = v.asF(a[0])-v.asF(a[1]);
    val = val * 10;
    return val;
};

var cp3 = function(a){
    var val = (v.asF(a[0])-v.asF(a[1]))/(v.asF(a[2])-v.asF(a[3]))*100;
    return val;
};

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage({
        "background-image": "url(\"http://clicca.de/WasserV2_image.svg\")",
        "width": "1030px",
        "height": "620px",
        "background-size": "1030px 620px"
            });
    c.setDefaultValue("wait..");
    c.addDF({   topics: ["home/state/heating/vitotronic/temperatureOutside"],
                style: "width: 56px; left: 54px; top: 307px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["home/state/heating/vitotronic/temperatureWater"],
                style: "width: 48px; left: 633px; top: 440px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });    
    c.addDF({   topics: ["home/state/heating/vitotronic/temperatureSupplyFlow","home/state/heating/vitotronic/modeHeaterValve"],
                style: "width: 56px; left: 765px; top: 450px;",
                unit: " °C",
                compute: cp1,            
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["home/state/heating/vitotronic/temperatureReturnFlow","home/state/heating/vitotronic/modeHeaterValve"],
                style: "width: 56px; left: 765px; top: 542px;",
                unit: " °C",
                compute: cp1,            
                //formatter: fp1,
                renderer: re.clickable,                
                prescale: 10,
                fraction: 1
            });     
    c.addDF({   topics: ["home/state/metering/gasmeter/counterConsumptionWarmWaterTotal","home/state/metering/gasmeter/counterConsumptionWarmWaterLastDay"],
                style: "width: 78px; left:  511px; top: 386px;",
                unit: " kWh/d",
                renderer: re.none,
                compute: cp2,
                prescale: 100,
                fraction: 1
            });    
    c.addDF({   topics: ["home/state/metering/gasmeter/counterConsumptionWarmWaterTotal","home/state/metering/gasmeter/counterConsumptionWarmWaterLastMonth"],
                style: "width: 78px; left:  511px; top: 410px;",
                unit: " kWh/m",
                renderer: re.none,
                compute: cp2,
                prescale: 100,
                fraction: 0
            });            
    c.addDF({   topics: ["home/state/metering/gasmeter/counterConsumptionWarmWaterTotal","home/state/metering/gasmeter/counterConsumptionWarmWaterLastMonth","home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastMonth"],
                style: "width: 46px; left:  810px; top: 496px;",
                //style: "width: 56px; left:  533px; top: 336px;",
                unit: " %",
                renderer: re.none,
                compute: cp3,
                prescale: 1,
                fraction: 1
            });               
            
}    