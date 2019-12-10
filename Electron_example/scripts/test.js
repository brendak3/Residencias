$(document).ready(function(){
  //HighChartExample();
  //Metodo para dibujar las graficas
  // var ctx = document.getElementById('myChart').getContext('2d');
  // myChart = new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //         labels: ['Read'],
  //         datasets: [{
  //             label: 'E.E.G. Read Signal 1',
  //             data: [],
  //             fill: false,
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 1)' //rgb(255, 255, 255, 0.2)
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)'
  //             ],
  //             borderWidth: 1
  //         },
  //         {
  //             label: 'E.E.G. Read Signal 2',
  //             data: [],
  //             fill: false,
  //             backgroundColor: [
  //                 'rgba(34, 139, 34, 1)' //rgb(255, 255, 255, 0.2)
  //             ],
  //             borderColor: [
  //                 'rgba(0,100,0, 1)'
  //             ],
  //             borderWidth: 1
  //         }
  //       ]
  //     },
  //     options: {
  //         scales: {
  //             yAxes: [{
  //                 ticks: {
  //                     beginAtZero: true
  //                 }
  //             }]
  //         }
  //     }
  // });

  //Inicializa la lecutra de Datos
  $('#start').click(function(){
    //StartTest();
    ListPorts();
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

function ListPorts(){
  ourBoard = new Cyton();
  ourBoard.autoFindOpenBCIBoard().then(portName => {
    if (portName) {
      /**
       * Connect to the board with portName
       * i.e. ourBoard.connect(portName).....
       */
       console.log("Conected");
    } else {
      /**Unable to auto find OpenBCI board*/
      console.log("Not conected");
    }
  });
}

//Inica el DataStream
function StartTest(){
  //Abrir el puerto para openbci
  ourBoard = new Cyton({
    simulate: false
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
            //cons0ole.log("Chanel " + i + " " + sample.channelData[i]);
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
  var myChart = Highcharts.chart('container', {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Fruit Consumption'
      },
      xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
          title: {
              text: 'Fruit eaten'
          }
      },
      series: [{
          name: 'Signal 1',
          data: {
            csvURL: urlInput.value,
            enablePolling: pollingCheckbox.checked === true,
            dataRefreshRate: parseInt(pollingInput.value, 10)
          }
      }, {
          name: 'Signal 2',
          data: {
            csvURL: urlInput.value,
            enablePolling: pollingCheckbox.checked === true,
            dataRefreshRate: parseInt(pollingInput.value, 10)
          }
      },{
        name: 'Signal 3',
        data: {
          csvURL: urlInput.value,
          enablePolling: pollingCheckbox.checked === true,
          dataRefreshRate: parseInt(pollingInput.value, 10)
        }
      },{
        name: 'Signal 4',
        data: {
          csvURL: urlInput.value,
          enablePolling: pollingCheckbox.checked === true,
          dataRefreshRate: parseInt(pollingInput.value, 10)
        }
      }
    ]
  });
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
