/* 
Chart
V2.0.3 vom 25.12.2017
*/
$(document).ready(function () {
    initChart();
});
var myChart;

function initChart(){
    Chart.defaults.global.elements.line.fill = false;
    
    var ctx = $("#myChart");

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Data1',
                    data: [{x: 1,y: 20},{x: 2,y: 12},{x: 3,y: 19},{x: 4,y: 3},{x: 5,y: 5},{x: 6,y: 2},{x: 7,y: 3}]
                },
                {
                    label: 'Data2',
                    data: [{x: 1,y: 3},{x: 2,y: 4},{x: 3,y: 5},{x: 4,y: 7},{x: 5,y: 9},{x: 6,y: 4},{x: 7,y: 3}]
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'month'
                    }
                }]
            }
        }
    });
}