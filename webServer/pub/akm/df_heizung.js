/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

var cp1 = function(a){
    var val = v.asF(a[0])-v.asF(a[1]);
    return val;
};

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage({
        "background-image": "url(\"http://clicca.de/HeizungV2_image.svg\")",
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
            
    c.addDF({   topics: ["home/state/heating/vitotronic/temperatureSetpoint"],
                style: "width: 56px; left: 442px; top: 332px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
            
    c.addDF({   topics: ["home/state/heating/vitotronic/temperatureSupplyFlow"],
                style: "width: 56px; left: 442px; top: 399px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            }); 
            
    c.addDF({   topics: ["home/state/heating/vitotronic/temperatureReturnFlow"],
                style: "width: 56px; left: 622px; top: 388px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });         
            
    c.addDF({   topics: ["home/state/heating/vitotronic/temperatureWater"],
                style: "width: 48px; left: 310px; top: 450px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
            
    c.addDF({   topics: ["home/state/heating/vitotronic/powerBurner"],
               style: "width: 56px; left: 622px; top: 332px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 2,
                fraction: 1
            });        
            
    c.addDF({   topics: ["home/state/heating/vitotronic/powerPump"],
                style: "width: 56px; left: 622px; top: 363px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 1,
                fraction: 1
            });  

    c.addDF({   topics: ["home/state/heating/vitotronic/modeHeaterValve"],
                style: "width: 20px; left: 563px; top: 407px;",
                unit: "",
                renderer: re.image,
                icons: ["/icons/Ventil_(Outline)_icon.svg","/icons/Ventil_(Heizen)_icon.svg","Ventil_(Befuellen)_icon","/icons/Ventil_(Wasser)_icon.svg"],                
                formatter: fo.none
    });  
    c.addDF({   topics: ["home/state/metering/gasmeter/powerActual"],
                style: "width: 56px; left: 325px; top: 332px;",
                unit: " kW",
                renderer: re.clickable,
                prescale: 1000,
                fraction: 1
            });
        
    c.addDF({   topics: ["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastDay"],
                style: "width: 78px; left:  203px; top: 362px;",
                unit: " m³/d",
                renderer: re.none,
                compute: cp1,
                prescale: 100,
                fraction: 2
            });    
    c.addDF({   topics: ["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastMonth"],
                style: "width: 78px; left:  203px; top: 386px;",
                unit: " m³/m",
                renderer: re.none,
                compute: cp1,
                prescale: 100,
                fraction: 2
            });                
    c.addDF({   topics: ["home/state/metering/gasmeter/counterConsumptionTotal","home/state/metering/gasmeter/counterConsumptionLastYear"],
                style: "width: 78px; left:  203px; top: 416px;",
                unit: " m³/y",
                renderer: re.none,
                compute: cp1,
                prescale: 100,
                fraction: 1
            });             
/*    c.addDF({   topics: ["akm/d02/state/temp2"],
                style: "width: 56px; left: 764px; top: 460px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["akm/d02/state/temp3"],
                style: "width: 56px; left: 764px; top: 551px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            }); 
    c.addDF({   topics: ["akm/d02/state/temp2","akm/d02/state/temp3"],
                style: "width: 46px; left: 814px; top: 506px;",
                unit: " °C",
                renderer: re.none,
                compute: cp1,
                prescale: 10,
                fraction: 1
            }); */
    c.addDF({   topics: ["home/state/heating/manifoldUpperFloor/temperatureSupplyFlow"],
                style: "width: 56px; left: 618px; top: 152px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });           
    c.addDF({   topics: ["home/state/heating/manifoldUpperFloor/temperatureReturnFlow"],
                style: "width: 56px; left: 618px; top: 244px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["home/state/heating/manifoldUpperFloor/temperatureSupplyFlow","home/state/heating/manifoldUpperFloor/temperatureReturnFlow"],
                style: "width: 46px; left: 577px; top: 199px;",
                unit: " °C",
                renderer: re.none,
                compute: cp1,
                prescale: 10,
                fraction: 1
            });                     
}