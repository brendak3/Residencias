$(document).ready(function(){
  $('#setup_test').modal('toggle');

  //TEST canvas Grafica
  $('#start').click(function(){
    DataSet();
  });

  $('#stop').click(function(){
    StopTest();
  });
  //Consulto todos los pacientes para rellenar el select
  Pacientes();
  Emotions();
  ListPorts();

  //Cuando el boton de Ok del modal sea pulsado
  $('#start_test').click(function(){
    $('#patient_name').val($('#patient option:selected').text());
    $('#video_name').val($('#video option:selected').text());
    $('#video_duration').val('3:50 min');
    $('#emotion').val($('#emotion_select option:selected').val());
    $('#setup_test').modal('toggle');
  });

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
/***********Grafica*************/
var signal_one = 0, signal_two = 0;
var chart;
var isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident') !== -1;
var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};
var color = Chart.helpers.color;
var config = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Signal 1',
      backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
      borderColor: chartColors.red,
      fill: false,
      lineTension: 0,
			borderDash: [8, 4],
      data: []
    }, {
      label: 'Signal 2',
      backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
      borderColor: chartColors.blue,
      fill: false,
      cubicInterpolationMode: 'monotone',
      data: []
    }]
  },

  options: {
    title:{
      display: true,
      text: 'Electroencephalogram Data Reading'
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 20000,
          ttl: 60000,
          refresh: 100,
          delay: 500,
          pause: false,
          onRefresh: onRefresh
        }
      }],
      yAxes:[{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Volts'
        }
      }]
    },
    tooltips:{
      mode: 'nearest',
      intersect: false
    },
    hover:{
      mode: 'nearest',
      intersect: false
    },
    plugins: {
      streaming:{
        frameRate: 30
      }
    }
  }
};
/***********Grafica*************/

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
        //console.log('Iteration');
        //console.log(sample.channelData[0]);
          for (var i = 0; i < 1; i++) {
            //console.log("Chanel " + i + " " + sample.channelData[i]);
            //myChart.data.labels.push(counter);

            // myChart.data.datasets.forEach(dataset => {
            //   dataset.data.push(sample.channelData[i]);
            // });

            //myChart.data.datasets[0].data.push(sample.channelData[0]);
            //myChart.data.datasets[1].data.push(sample.channelData[1]);

            //counter++;
            //myChart.update();
            signal_one = sample.channelData[0];
            signal_two = sample.channelData[1];
            //console.log(sample.channelData[0]);
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

//TESTER GRAFICA DataSet
function DataSet(){
  StartTest();
  var ctx = document.getElementById('myChart').getContext('2d');
  chart = new Chart(ctx, config);
  var colorNames = Object.keys(chartColors);
  document.getElementById('duration').addEventListener(isIE ? 'change' : 'input', function() {
  	config.options.scales.xAxes[0].realtime.duration = +this.value;
  	chart.update({duration: 0});
  	document.getElementById('durationValue').innerHTML = this.value;
  });

  document.getElementById('ttl').addEventListener(isIE ? 'change' : 'input', function() {
  	config.options.scales.xAxes[0].realtime.ttl = +this.value;
  	chart.update({duration: 0});
  	document.getElementById('ttlValue').innerHTML = this.value;
  });

  document.getElementById('refresh').addEventListener(isIE ? 'change' : 'input', function() {
  	config.options.scales.xAxes[0].realtime.refresh = +this.value;
  	chart.update({duration: 0});
  	document.getElementById('refreshValue').innerHTML = this.value;
  });

  document.getElementById('delay').addEventListener(isIE ? 'change' : 'input', function() {
  	config.options.scales.xAxes[0].realtime.delay = +this.value;
  	chart.update({duration: 0});
  	document.getElementById('delayValue').innerHTML = this.value;
  });

  document.getElementById('frameRate').addEventListener(isIE ? 'change' : 'input', function() {
  	config.options.plugins.streaming.frameRate = +this.value;
  	chart.update({duration: 0});
  	document.getElementById('frameRateValue').innerHTML = this.value;
  });

  document.getElementById('pause').addEventListener('change', function() {
  	config.options.scales.xAxes[0].realtime.pause = this.checked;
  	chart.update({duration: 0});
  	document.getElementById('pauseValue').innerHTML = this.checked;
  });
}

function randomScalingFactor() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function onRefresh(chart){
  chart.config.data.datasets[0].data.push({
    x: Date.now(),
    y: signal_one
  });

  chart.config.data.datasets[1].data.push({
    x: Date.now(),
    y: signal_two
  });

  // chart.config.data.datasets.forEach(function(dataset) {
	// 	dataset.data.push({
	// 		x: Date.now(),
	// 		y: randomScalingFactor()
	// 	});
	// });
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
