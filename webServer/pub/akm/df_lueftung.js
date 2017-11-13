/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

function drawChart(){}

var re1 = function(id,val,style){
    if (parseFloat(val)<0){
        style +="background-color: #BBDEFB";
        }
    else {
        style +="background-color: #FFCDD2";
        }
    return "<div class=\"df\" id=\""+id+"\" style=\""+style+"\">"+val+"</div>";
};

var re2 = function(id,val,style){
    style +="background-color: #E8EAF6";
    return "<div class=\"df\" id=\""+id+"\" style=\""+style+"\">"+val+"</div>";
};

var cp1 = function(a){
    var val = v.asF(a[0])-v.asF(a[1]);
    // if (val + v.asF(a[1])>0) val *=-1; 
    return val;
};    

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage({
        "background-image": "url(\"http://clicca.de/LueftungV2_image.svg\")",
        "width": "1030px",
        "height": "620px",
        "background-size": "1030px 620px"
    });
    c.setDefaultValue("wait..");
    c.addDF({   topics: ["home/state/ventilation/airDistribution/temperatureSupplyAir"],
                style: "width: 56px; left: 689px; top: 408px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["home/state/ventilation/airDistribution/humiditySupplyAir"],
                style: "width: 56px; left: 689px; top: 432px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });    
    c.addDF({   topics: ["home/state/ventilation/airDistribution/temperatureExhaustAir"],
                style: "width: 56px; left: 689px; top: 341px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });      
    c.addDF({   topics: ["home/state/ventilation/airDistribution/humidityExhaustAir"],
                style: "width: 56px; left: 689px; top: 365px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });          
    c.addDF({   topics: ["home/state/ventilation/airDistribution/temperatureSupplyAir","home/state/ventilation/airDistribution/temperatureExhaustAir"],
                style: "width: 56px; left:  795px; top: 386px;",
                unit: " °C",
                compute: cp1,
                renderer: re1,
                prescale: 10,
                fraction: 1
            });    
    c.addDF({   topics: ["home/state/heating/vitotronic/temperatureOutside"],
                style: "width: 56px; left: 54px; top: 307px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });    
    c.addDF({   topics: ["home/state/ventilation/polling/humitidyOutsideAir"],
                style: "width: 56px; left: 54px; top: 331px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });           
    c.addDF({   topics: ["home/state/ventilation/intakeAirHeatExchanger/modeHeatExchanger"],
                style: "width: 10px; left: 186px; top: 415px;",
                renderer: re.image,
                formatter: fo.none,        
                icons: ["/icons/Zuluft_(outline)_icon.svg","/icons/Zuluft_Hand_(direkt)_icon.svg","/icons/Zuluft_Hand_(EWT)_icon.svg","/icons/Zuluft_Auto_(direkt)_icon.svg","/icons/Zuluft_Auto_(EWT)_icon.svg","/icons/Zuluft_Auto_(offline)_icon.svg"]
            }); 
    c.addDF({   topics: ["home/state/ventilation/intakeAirHeatExchanger/temperatureUpperThreshold"],
                style: "width: 56px; left: 237px; top: 518px;",
                unit: " °C",
                renderer: re2,
                prescale: 10,
                fraction: 1
            });       
    c.addDF({   topics: ["home/state/ventilation/intakeAirHeatExchanger/temperatureLowerThreshold"],
                style: "width: 56px; left: 237px; top: 542px;",
                unit: " °C",
                renderer: re2,
                prescale: 10,
                fraction: 1
            });
   c.addDF({   topics: ["home/state/ventilation/intakeAirBypass/modeBypass"],
                style: "width: 10px; left: 391px; top: 428px;",
                renderer: re.image,
                formatter: fo.none,        
                icons: ["/icons/Bypass_(outline)_icon.svg","/icons/Bypass_Hand_(geschlossen)_icon.svg","/icons/Bypass_Hand_(offen)_icon.svg","/icons/Bypass_Auto_(geschlossen)_icon.svg","/icons/Bypass_Auto_(offen)_icon.svg"]            
            });            
}