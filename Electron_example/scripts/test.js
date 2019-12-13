$(document).ready(function(){
  $('#setup_test').modal('toggle');

  //Consulto todos los pacientes para rellenar el select
  Pacientes();
  Emotions();
  ListPorts();
  
  //Cuando una opcion es seleccionada
  $('#emotion_select').change(function(){
    $('#video').empty();
    Videos($('#emotion_select option:selected').val());
  });

  //Refrescar el multiselect
  $('#refresh').click(function(){
    $("#board_com").empty()
    ListPorts();
  });
  //Inicializo Cyton para su uso
  const ourBoard = new Cyton();
});

//librerías
//Lo requerido para las graficas
var Chart = require('chart.js');

//requerido para graficas de highcharts
var Highcharts = require('highcharts');

//Libreria para el puerto serial
const serialport = require('serialport')

//BD
const mariadb = require('mariadb');

//Conexion a BD
const pool = mariadb.createPool({
     database: 'residencia',
     host: '127.0.0.1',
     user:'root',
     password: '',
     connectionLimit: 5
});

//Variables
//Grafica
var myChart;
//Para leer las señales de la placa
var portName;

//Encontrar si hay puertos COM disponibles
function ListPorts(){
  serialport.list((err, ports) => {
    if (ports.length === 0) {
      //console.log("No ports discovered");
      $("#board_com").append(new Option("No ports discovered", 0));
    }
    else if (err) {
      console.log(err);
    } else {
      //console.log('ports', ports);
      //console.log(ports[0].comName);
      for (var i = 0; i < ports.length; i++) {
        $("#board_com").append(new Option(ports[i].comName, ports[i].comName));
      }
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

/*Llenar los SELECT del modal*/
function Pacientes(){
  pool.getConnection()
    .then(conn => {
      conn.query("SELECT RSD_ID, RSD_NAME, RSD_LASTNAME FROM RESIDENCIA.rs_datospersona")
        .then((rows) => {
          //console.log(rows); //[ {val: 1}, meta: ... ]
          for (var i = 0; i < rows.length; i++) {
            $("#patient").append(new Option(rows[i].RSD_NAME + " " + rows[i].RSD_LASTNAME, rows[i].RSD_ID));
          }
        })
        .then((res) => {
          //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          //alert(res);
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err);
          conn.end();
        })

    }).catch(err => {
      //not connected
    });
}

function Emotions(){
  pool.getConnection()
    .then(conn => {
      conn.query("SELECT DISTINCT(RSC_EMOCION) FROM RESIDENCIA.rs_catalog_video")
        .then((rows) => {
          //console.log(rows); //[ {val: 1}, meta: ... ]
          for (var i = 0; i < rows.length; i++) {
            $("#emotion_select").append(new Option(rows[i].RSC_EMOCION, rows[i].RSC_EMOCION));
          }
        })
        .then((res) => {
          //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          //alert(res);
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err);
          conn.end();
        })

    }).catch(err => {
      //not connected
    });
}

function Videos(emotion){
  pool.getConnection()
    .then(conn => {
      conn.query("SELECT RSC_ARTISTA, RSC_CANCION, RSC_EMOCION FROM RESIDENCIA.rs_catalog_video WHERE RSC_EMOCION = '" + emotion + "'")
        .then((rows) => {
          //console.log(rows); //[ {val: 1}, meta: ... ]
          for (var i = 0; i < rows.length; i++) {
            $("#video").append(new Option(rows[i].RSC_CANCION + " - " + rows[i].RSC_ARTISTA, rows[i].RSC_EMOCION));
          }
        })
        .then((res) => {
          //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          //alert(res);
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err);
          conn.end();
        })

    }).catch(err => {
      //not connected
    });
}
