/* 
Chart
V2.0.3 vom 25.12.2017
*/
/* global moment, _h */
var socket = io();

Chart.defaults.global.elements.line.fill = false;

class Diagram {
    constructor(context=null, on=null, progressBar='<div><div style="width:100%;" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div></div>'){
        // this.currentId=0;
        this.currentGraphId=0;        
        this.graphs=[];
        this.currentDurationId=0;        
        this.durations=[];

        this.setContext(context,on);
        this.progressBar =progressBar;
        this.startFlag=false;
        this.runFlag=false;
        this.socketListeners={};
        this.myChart;
        return this;
    }
    setContext(context,on=null){
        this.context=context;
        this.on=on;
        return this;
    }
    _addSocketListener(topic,id,interval){
        if (!this.socketListeners[topic+"#"+id]){
            console.log("Listening on:" + topic+"#"+id);
            socket.on(topic+"#"+id,(topic)=>this._socketListenerHandler(topic,id,this));
            socket.emit('chart',{topicId:topic+"#"+id,interval:interval});
            this.socketListeners[topic+"#"+id]={};
        }
    }
    _removeSocketListener(topic,id){
        if (this.socketListeners[topic+"#"+id]){
            console.log("Remove on:" + topic);
            socket.off(topic+"#"+id);
            this.socketListeners[topic+"#"+id]=null;
        }
    }
    _socketListenerHandler(fullTopic,id,scope){
        if (!this.startFlag) return;
        if (! $(this.on).hasClass( "is-active" )) return;
            
        console.log("Chart received: " + fullTopic.topic + " : " + fullTopic.ts + " : " + fullTopic.message + " : " + id + " : " + scope);

        if (scope.myChart.data.datasets.length > id) {
            // scope.myChart.data.labels.push(newDate(scope.myChart.data.labels.length));
            // scope.myChart.data.labels.push(moment().add(scope.myChart.data.labels.length,'s').toDate());

            // if (typeof scope.myChart.data.datasets[id].data[0] === "object") {
                scope.myChart.data.datasets[id].data.push({
                        x: new Date(parseInt(fullTopic.ts)), // newDate(scope.myChart.data.datasets[id].data.length),
                        y: Math.floor(parseInt(fullTopic.ts))
                });

                scope.myChart.update();
            // }
        }
    }
    duration(name,duration){
        this.durations.push({id:this.currentDurationId++,name:name,duration:duration});
        return this;
    }
    graph(name,topic){
        this.graphs.push({id:this.currentGraphId++,name:name,topic:topic});
        return this;
    }
    /*_add(name,topic,duration){
        if (!this.context) {console.error("Please set context first [setContext(context);]"); return this;}
        var id=this.currentId++;
        this._addSocketListener(topic,id,duration);
        return this;
    }*/
    _update(e){
        var graph = this.graphs[$(e.target).val()];
        var duration = this.durations[$("input[name=durations]:checked").val()];
        console.log(graph);
        // console.log(e.target.attributes["data-topic"].nodeValue);
        console.log(duration);

        if (e.target.checked) {
            this._addSocketListener(graph.topic,graph.id,duration);
            
        } else {
            this._removeSocketListener(graph.topic,graph.id);            
        }
    }
    start(){
        if (!this.context) {console.error("Please set context first [setContext(context);]"); return this;}

        this.durations.forEach(function(element) {
            // console.log(element);
            $("#chart-menu-duration").append(
                '<li id="switch-li-' + element.id + '" class="mdl-list__item">' +
                '<span class="mdl-list__item-primary-content">' + element.name + '</span>' +
                '<span class="mdl-list__item-secondary-action">' + 
                '<label style="display: inline;" class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="switch-' + element.id + '">' +
                '<input type="radio" name="durations" value="' + element.id + '" id="switch-' + element.id + '" class="chart-menu-duration mdl-radio__button" checked />' +
                '</label>' +
                '</span>' +
                '</li>' 
            );
        });
        
        this.graphs.forEach(function(element) {
            // console.log(element);
            $("#chart-menu-graph").append(
                '<li id="graph-li-' + element.id + '" class="mdl-list__item">' +
                '<span class="mdl-list__item-primary-content">' + element.name + '</span>' +
                '<span class="mdl-list__item-secondary-action">' + 
                '<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="graph-' + element.id + '">' +
                '<input type="checkbox" id="graph-' + element.id + '" value="' + element.id + '" class="chart-menu-graph mdl-switch__input" data-topic="' + element.topic + '"/>' +
                '</label>' +
                '</span>' +
                '</li>' 
            );
        });

        // $(".chart-menu-duration").change( (e)=>{this._update(e);});
        $(".chart-menu-graph").change( (e)=>{this._update(e);});

        this.startFlag=true;

/*                    {
                        borderColor: window.chartColors.red,
                        label: 'Data1' //,
                        // data: [{x: newDate(0),y: 20},{x: newDate(1),y: 12},{x: newDate(2),y: 19},{x: newDate(3),y: 3},{x: newDate(4),y: 5},{x: newDate(5),y: 2},{x: newDate(6),y: 3}]
                    },
                    {
                        borderColor: window.chartColors.blue,
                        label: 'Data2' //,
                        // data: [{x: newDate(0),y: 3},{x: newDate(2),y: 4},{x: newDate(6),y: 5},{x: newDate(7),y: 7},{x: newDate(9),y: 9},{x: newDate(11),y: 4},{x: newDate(12),y: 3}]
                    }
*/

        this.myChart = new Chart($(this.context), {
            type: 'line',
            data: {
                labels: [ // Date Objects
                        new Date()
                ],
                datasets: [
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

/*
function chart(chart){ // {topic: "topic", duration:"timestamp-timestamp"}
    console.log(chart);
    socket.emit('chart',chart);        
};
*/


// Utilities

var timeFormat = 'DD.MM.YY HH:mm:ss';

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};