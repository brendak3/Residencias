$(document).ready(function(){
  //Metodo para dibujar las barras
  //ChartJQ();
  var ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
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

  //Inicializa la lecutra de Datos
  $('#start').click(function(){
    StartTest();
  });
});
var Chart = require('chart.js');
var myChart;

function StartTest(){
  const ourBoard = new Cyton({
    simulate: true
  });

  //Simulo que leo del puerto
  var portName = constants.OBCISimulatorPortName;
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
            myChart.data.datasets.forEach(dataset => {
              dataset.data.push(sample.channelData[i]);
            });
            counter++;
            myChart.update();
          }
      });
    //});
  }).catch(function(err){
    console.log("Pues no se pudo");
  });
}

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
