$(document).ready(function(){
  HighChartExample();
  //Metodo para dibujar las graficas
  var ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Read'],
          datasets: [{
              label: 'E.E.G. Read Signal 1',
              data: [],
              fill: false,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)' //rgb(255, 255, 255, 0.2)
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          },
          {
              label: 'E.E.G. Read Signal 2',
              data: [],
              fill: false,
              backgroundColor: [
                  'rgba(34, 139, 34, 1)' //rgb(255, 255, 255, 0.2)
              ],
              borderColor: [
                  'rgba(0,100,0, 1)'
              ],
              borderWidth: 1
          }
        ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

  //Inicializa la lecutra de Datos
  $('#start').click(function(){
    StartTest();
  });

  //Inicializo el boton para cerrar proceso de lectura de señal
  $('#stop').click(function(){
    StopTest();
  });

  //Inicializo Cyton para su uso
  const ourBoard = new Cyton();
});
//Lo requerido para las graficas
var Chart = require('chart.js');

//requerido para graficas de highcharts
var Highcharts = require('highcharts');

var myChart;
//Para leer las señales de la placa

var portName;

//Inica el DataStream
function StartTest(){
  //Abrir el puerto para openbci
  ourBoard = new Cyton({
    simulate: true
  });

  //Simulo que leo del puerto
  portName = constants.OBCISimulatorPortName;

  let counter = 0;
  ourBoard.connect(portName).then(function (){
    console.log('Console');
    //ourBoard.on('ready', () =>{
      ourBoard.streamStart();
      ourBoard.on('sample', function(sample){ //Por el momento solo estamos trabajando con datos simulados que ofrece la librería de OpenBCI
        console.log('Iteration');
        //console.log(sample.channelData[0]);
          for (var i = 0; i < 1; i++) {
            //console.log("Chanel " + i + " " + sample.channelData[i]);
            myChart.data.labels.push(counter);

            // myChart.data.datasets.forEach(dataset => {
            //   dataset.data.push(sample.channelData[i]);
            // });

            myChart.data.datasets[0].data.push(sample.channelData[0]);
            myChart.data.datasets[1].data.push(sample.channelData[1]);

            counter++;
            myChart.update();
          }
      });
    //});
  }).catch(function(err){
    console.log("Pues no se pudo");
  });
}

//Detiene el DataStream
function StopTest(){
  ourBoard.streamStop().then(ourBoard.disconnect());
}

function HighChartExample(){
  Highcharts.getJSON(
    'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json',
    function (data) {

        Highcharts.chart('container', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'USD to EUR exchange rate over time'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'USD to EUR',
                data: data
            }]
        });
    }
);
}

/*LEGACY PINTA LA GRAFICA*/
function ChartJQ() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Read'],
          datasets: [{
              label: 'E.E.G. Read',
              data: [],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}
