//Todo lo que este aqui se va a cargar al inicio
$(document).ready(function(){
  $('#alta_usuario').hide();
  $('#title').html("Historial of Tests <small>List of the lates patient tests.</small>");

  //Boton para dar de alta un nuevo paciente
  $('#alta_usuario').click(function(){
    $('#changes').hide();
    $('#save').show();

    //Limpio el Formulario
    $('#id_paciente').val();
    $('#name').val('');
    $('#lastname').val('');
    $('#age').val('');
    $('#email').val('');
    $('#occupation').val('');
    $('#inputBirthdate').val('');
    $('#inputState select').val('');
  });

  //Asigno los eventos de alta y de edicion
  $('#changes').click(function(){
    UpdatePaciente();
  });

  $('#save').click(function(){
    InsertPaciente();
  });


  //Cambio de contenido en la vista principal
  $('#altausuario').click(function(){
    // TablaPacientes();
    $('#containerHTML').load('../views/tabla_pacientes.html');
  });

  /*Tabla de usuarios*/
  $('#tablapruebas').click(function(){
    // TablaPruebas();
    $('#containerHTML').load('../views/tabla_pruebas.html');
  });

  /*Vista para pruebas*/
  $('#patientTest').click(function(){
    $('#containerHTML').load('../views/patientTest.html');
    $('#javascriptContent').load('../views/patientTestjs.html');
  });


  /*Tabla de datos*/ //Al parecer no uso esto.
  // $('#grafica').click(function(){
  //   $('#page').attr('src', '../views/test.html');
  // });

  $('#containerHTML').load('../views/tabla_pruebas.html');
});

/*Variables, Importacion de Modulus, etc*/
const mariadb = require('mariadb');
var x = [];
var innerBody = "";
var innerRow = "";
var result;

/*Constantes para creacion de ventanas en electron*/
const url = require('url');
const path = require('path');
const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
var session = require("electron").remote.session;
var ses = session.fromPartition("persist:name");

/*Comunicacion con el proceso Main*/
const { ipcRenderer  } = require('electron');
var userName;
var isAdmin

/*Obtener la informacion para la cookie del usuario*/
ipcRenderer.on("cookie-creation", (event, args) => {
  //document.cookie = "session=" + JSON.stringify(args);
  setCookie(args, "myCookie")
  getCookie("myCookie")
});


function setCookie(data, name) {
  var expiration = new Date();
  var hour = expiration.getHours();
  hour = hour + 24;
  expiration.setHours(hour);
  ses.cookies.set({
    url: "https://myapp.com", //the url of the cookie.
    name: name, // a name to identify it.
    value: data, // the value that you want to save
    expirationDate: expiration.getTime()
}, function(error) {
    console.log(error);
  });
}

function getCookie(name) {
  var cookieValue;
  var value = {
    name: name // the request must have this format to search the cookie.
  };
  ses.cookies.get(value, function(error, cookies) {
    console.log(cookies[0].value); // the value saved on the cookie
    cookieValue = cookies[0].value;
  });

  return cookieValue;
}

//Abrir uina ventana como modal
function ModalLogin(){
  //Guardo la ventana en una variable
  var window = remote.getCurrentWindow();
  //Creo la ventana Child de Login
  let child = new BrowserWindow({ parent: window, modal: true})
  child.loadURL(url.format({
    pathname: path.join(__dirname, '/loginmodal.html'),
    protocol: 'file',
    slashes: true
  }))

  child.once('ready-to-show', () => {
    child.show()
  })

  child.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null

    /*El del video*/
    //app.quit();
  })
}


//Conexion a BD
const pool = mariadb.createPool({
     database: 'residencia',
     host: '127.0.0.1',
     user:'root',
     password: '',
     connectionLimit: 5
});


/*Inicia la tabla de pruebas*/
function TablaPruebas(){
  innerRow = "";
  //document.getElementById('trows').innerHTML = "";
  $('#trows').html('');
  innerRow = "<th>#</th>" +
              "<th>Name</th>" +
              "<th>Date</th>" +
              "<th>Duration</th>" +
              "<th>Expected Emotion</th>" +
              "<th>Options</th>";

  $('#trows').html(innerRow);

  //Mando a llamar el método que va a la BD y me trae los registros
  //InfoTablaTest();
}


/*Vista de Pacientes*/
// function TablaPacientes(){
//   innerRow = "";
//   //document.getElementById('trows').innerHTML = "";
//   //Limpia los nombres de las columnas
//   $('#trows').html('');
//
//   //Nombre de las columnas nuevas
//   innerRow = "<th>#</th>" +
//               "<th>Name</th>" +
//               "<th>Age</th>" +
//               "<th>Gender</th>" +
//               "<th>Date</th>" +
//               "<th>Options</th>";
//
//   //Muestra los
//   $('#trows').html(innerRow);
//
//   pool.getConnection()
//   .then(conn => {
//     conn.query("SELECT RSD_ID, RSD_NAME, RSD_LASTNAME, RSD_AGE, RSD_GENDER, DATE_FORMAT(RSD_DATE, \'%c/%e/%Y %h:%i:%s %p\') as RSD_DATE FROM RESIDENCIA.rs_datospersona")
//     .then((rows) => {
//       //console.log(rows);
//       json = JSON.stringify(rows);
//       //console.log(json);
//
//       result = rows;
//       $('#tbody').html('');
//       for (var i = 0; i < result.length; i++) {
//         innerBody = "";
//
//         innerBody = "<tr>" +
//                     "<td>" + result[i].RSD_ID + "</td>" +
//                     "<td>" + result[i].RSD_NAME + " " + result[i].RSD_LASTNAME + "</td>" +
//                     "<td>" + result[i].RSD_AGE + "</td>" +
//                     "<td>" + result[i].RSD_GENDER + "</td>" +
//                     "<td>" + result[i].RSD_DATE + "</td>" +
//                     "<td> <button id=\"editar_" + result[i].RSD_ID + "\" onclick=\"EditarPaciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-pencil\"></i></button>" +
//                     "<button id=\"consultar_" + result[i].RSD_ID + "\" onclick=\"Consultar_paciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-success\"><i class=\"fa fa-file-text\"></i></button>" +
//                     "<button id=\"eliminar_" + result[i].RSD_ID + "\" onclick=\"Eliminar_paciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-danger\"><i class=\"fa fa-trash\"></i></button>" +
//                     "</td>" +
//                     "</tr>";
//
//         $('#tbody').append(innerBody);
//       }
//     })
//     .then((res) => {
//       //console.log(res);
//       conn.end();
//     })
//     .catch(err => {
//       console.log(err);
//       conn.end();
//     })
//   }).catch(err =>{
//     console.log(err);
//   });
// }

/*CRUD Paciente*/
function EditarPaciente(id){
  $('#alta_paciente').modal('toggle');
  $('#changes').show();
  $('#save').hide();
  console.log(id);

  //Consulta para traer los datos de la BD
  pool.getConnection()
    .then(conn => {

      conn.query("SELECT RSD_NAME, RSD_LASTNAME, RSD_AGE, RSD_EMAIL, RSD_OCCUPATION, RSD_GENDER, DATE_FORMAT(RSD_DATE, '%Y-%m-%d') as RSD_DATE FROM RESIDENCIA.rs_datospersona WHERE RSD_ID = " + id)
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]

          $('#id_paciente').val(id);

          $('#name').val(rows[0].RSD_NAME);
          $('#lastname').val(rows[0].RSD_LASTNAME);
          $('#age').val(rows[0].RSD_AGE);
          $('#email').val(rows[0].RSD_EMAIL);
          $('#occupation').val(rows[0].RSD_OCCUPATION);
          $('#inputBirthdate').val(rows[0].RSD_DATE);
          $('#inputState').val(rows[0].RSD_GENDER);
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
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

function UpdatePaciente(){
  pool.getConnection()
    .then(conn => {

      conn.query("UPDATE RESIDENCIA.rs_datospersona SET " +
                "RSD_NAME = '" + $('#name').val() + "', " +
                "RSD_LASTNAME = '" + $('#lastname').val() + "', " +
                "RSD_AGE = " + $('#age').val() + ", " +
                "RSD_EMAIL = '" + $('#email').val() + "', " +
                "RSD_OCCUPATION = '" + $('#occupation').val() + "', " +
                "RSD_GENDER = '" + $('#inputState option:selected').val() + "', " +
                "RSD_DATE = '" + $('#inputBirthdate').val() + "' " +
                "WHERE RSD_ID = " + $('#id_paciente').val())
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before
          // " CREATE TABLE myTable (id int, val varchar(255)) "
          //return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
          $("#alta_paciente").modal("toggle");
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          alert('Register successfully update.');
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

function InsertPaciente(){
  var cookie = getCookie("myCookie");

  pool.getConnection()
    .then(conn => {

      conn.query("INSERT INTO RESIDENCIA.rs_datospersona (RSD_NAME, RSD_LASTNAME, RSD_AGE, RSD_EMAIL, RSD_OCCUPATION, RSD_GENDER, RSD_DATE, RSD_USERID) " +
                "VALUES ('"+ $('#name').val() + "', '" + $('#lastname').val() + "', "+ $('#age').val() + ", '" + $('#email').val() + "', '" + $('#occupation').val() + "', '" + $('#inputState option:selected').val() + "' , '" + $('#inputBirthdate').val() + "')")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before
          // " CREATE TABLE myTable (id int, val varchar(255)) "
          //return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
          //cerrar modal
          $("#alta_paciente").modal("toggle");
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          //alert(res);
          alert('Register successfully inserted.');
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

function Consultar_paciente(id){
  $('#alta_paciente').modal('toggle');
  $('#changes').hide();
  $('#save').hide();

  pool.getConnection()
    .then(conn => {

      conn.query("SELECT RSD_NAME, RSD_LASTNAME, RSD_AGE, RSD_EMAIL, RSD_OCCUPATION, RSD_GENDER, DATE_FORMAT(RSD_DATE, '%Y-%m-%d') as RSD_DATE FROM RESIDENCIA.rs_datospersona WHERE RSD_ID = " + id)
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before
          // " CREATE TABLE myTable (id int, val varchar(255)) "
          //return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
          //cerrar modal
          //$("#alta_paciente").modal("toggle");
          $('#id_paciente').val(id);

          $('#name').val(rows[0].RSD_NAME);
          $('#name').attr('readonly', 'readonly');
          $('#lastname').val(rows[0].RSD_LASTNAME);
          $('#lastname').attr('readonly', 'readonly');
          $('#age').val(rows[0].RSD_AGE);
          $('#age').attr('readonly', 'readonly');
          $('#email').val(rows[0].RSD_EMAIL);
          $('#email').attr('readonly', 'readonly');
          $('#occupation').val(rows[0].RSD_OCCUPATION);
          $('#occupation').attr('readonly', 'readonly');
          $('#inputBirthdate').val(rows[0].RSD_DATE);
          $('#inputBirthdate').attr('readonly', 'readonly');
          $('#inputState').val(rows[0].RSD_GENDER);
          $('#inputState').attr('readonly', 'readonly');
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
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

function Eliminar_paciente(id){
  confirm('Are you sure you want to delete this record?')
  alert('Register successfully deleted.')
  // pool.getConnection()
  //   .then(conn => {
  //
  //     conn.query("DELETE * FROM RESIDENCIA.rs_datospersona WHERE RSD_ID = " + id)
  //       .then((rows) => {
  //         console.log(rows); //[ {val: 1}, meta: ... ]
  //         //Table must have been created before
  //         // " CREATE TABLE myTable (id int, val varchar(255)) "
  //         //return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
  //         //cerrar modal
  //         //$("#alta_paciente").modal("toggle");
  //       })
  //       .then((res) => {
  //         console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  //         alert(res);
  //         conn.end();
  //       })
  //       .catch(err => {
  //         //handle error
  //         console.log(err);
  //         conn.end();
  //       })
  //
  //   }).catch(err => {
  //     //not connected
  //   });
}
