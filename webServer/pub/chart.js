/* 
Chart
V2.0.3 vom 25.12.2017
*/
/* global moment */
var socket = io();

Chart.defaults.global.elements.line.fill = false;

class Diagram {
    constructor(context=null, progressBar='<div><div style="width:100%;" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div></div>'){
        this.currentId=0;
        this.context = context;
        this.progressBar =progressBar;
        this.startFlag=false;
        this.socketListeners={};
        this.myChart;
        return this;
    }
    setContext(context){
        this.context=context;
        return this;
    }
    _addSocketListener(topic,id,interval){
        if (!this.socketListeners[topic+"###"+id]){
            //console.log("Listening on:" + topic);
            socket.on(topic,(fullTopic)=>this._socketListenerHandler(fullTopic,id,this));
            socket.emit('chart',{topic:topic,interval:interval});
            this.socketListeners[topic+"###"+id]={};
        }
    }
    _socketListenerHandler(fullTopic,id,scope){
        if (!this.startFlag) return;
            
        console.log("Chart received: " + fullTopic.topic + " : " + fullTopic.ts + " : " + fullTopic.message + " : " + id + " : " + scope);

        console.log(moment());
        
        if (scope.myChart.data.datasets.length > id) {
            // scope.myChart.data.labels.push(newDate(scope.myChart.data.labels.length));
            // scope.myChart.data.labels.push(moment().add(scope.myChart.data.labels.length,'s').toDate());

            // if (typeof scope.myChart.data.datasets[id].data[0] === "object") {
                scope.myChart.data.datasets[id].data.push({
                        x: new Date(), // newDate(scope.myChart.data.datasets[id].data.length),
                        y: Math.floor(Math.random()*20)
                });

                scope.myChart.update();
            // }
        }
    }
    add(topic,duration){
        if (!this.context) {console.error("Please set context first [setContext(context);]"); return this;}
        var id=this.currentId++;
        this._addSocketListener(topic,id,duration);
        return this;
    }
    start(){
        if (!this.context) {console.error("Please set context first [setContext(context);]"); return this;}
        this.startFlag=true;

        this.myChart = new Chart($(this.context), {
            type: 'line',
            data: {
                /*labels: [ // Date Objects
                        newDate(0),
                        newDate(1)
                ],*/

                datasets: [
                    {
                        borderColor: window.chartColors.red,
                        label: 'Data1' //,
                        // data: [{x: newDate(0),y: 20},{x: newDate(1),y: 12},{x: newDate(2),y: 19},{x: newDate(3),y: 3},{x: newDate(4),y: 5},{x: newDate(5),y: 2},{x: newDate(6),y: 3}]
                    },
                    {
                        borderColor: window.chartColors.blue,
                        label: 'Data2' //,
                        // data: [{x: newDate(0),y: 3},{x: newDate(2),y: 4},{x: newDate(6),y: 5},{x: newDate(7),y: 7},{x: newDate(9),y: 9},{x: newDate(11),y: 4},{x: newDate(12),y: 3}]
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'second',
                            parser: timeFormat,
                            tooltipFormat: timeFormat
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                    }]
                }
            }
        });
    }
}


// Utilities

var timeFormat = 'DD.MM.YY HH:mm:ss';

function newDate(days) {
        return moment().add(days, 's').toDate();
}

function newDateString(days) {
        return moment().add(days, 's').format(timeFormat);
}

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};