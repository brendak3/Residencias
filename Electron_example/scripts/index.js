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

  /*LEGACY*/
  // $('#login').click(function(){
  //   Login($('#email').val(), $('#password').val());
  // });

  //Abrir el modal
  //ModalLogin();

  /*Ventana Modal para LogIn*/
  // document.getElementById('page').onload = function () {
  //   const iframeWin = document.getElementById('page').contentWindow
  //   iframeWin.require = window.require
  // }

  //Realiza query a la BD para llenar la tabla principal
  TablaPruebas();

  $('#altausuario').click(function(){
    // $('#page').attr('src', '../views/altausuario.html');
    //Llena la tabla de usuarios para mostarla al usuarios
    $('#title').html("Patients <small>List of patients.</small>");
    $('#alta_usuario').show();
    TablaPacientes();
  });

  /*Tabla de usuarios*/
  $('#tablapruebas').click(function(){
    //$('#page').attr('src', '../views/tablapruebas.html');
    $('#title').html("Historial of Tests <small>List of the lates patient tests.</small>");
    $('#alta_usuario').hide();
    TablaPruebas();
  });

  /*Tabla de datos*/
  $('#grafica').click(function(){
    $('#page').attr('src', '../views/test.html');
  });
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

/*LEGACY YA NO EXISTE*/
function Login(email, password){
  pool.getConnection()
    .then(conn =>
      conn.query("SELECT COUNT(*) AS EXIST FROM RS_USER WHERE RS_EMAIL = '" + email + "' AND RS_PASSWORD = '" + password + "'")
        .then((rows) => {
          conn.end();
          x = rows[0];
          console.log(rows[0]);

          console.log(x);

          //Si es mayor a 0 entonces hubo un match
          if (x['EXIST'] > 0) {
            document.getElementById('body').innerHTML = "";
            innerhtml =  "<ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">" +
              "<li class=\"nav-item\">" +
                "<a class=\"nav-link active\" id=\"home-tab\" data-toggle=\"tab\" href=\"#home\" role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">Ultimas Pruebas </a>"+
              "</li>" +
              "<li class=\"nav-item\">" +
                "<a class=\"nav-link\" id=\"profile-tab\" data-toggle=\"tab\" href=\"#profile\" role=\"tab\" aria-controls=\"profile\" aria-selected=\"false\">Registrados</a>"+
              "</li>" +
              "<li class=\"nav-item\">"+
                "<a class=\"nav-link\" id=\"contact-tab\" data-toggle=\"tab\" href=\"#contact\" role=\"tab\" aria-controls=\"contact\" aria-selected=\"false\">Etc.</a>" +
              "</li>" +
            "</ul>"+
            "<div class=\"tab-content\" id=\"myTabContent\">" +
              "<div class=\"tab-pane fade show active\" id=\"home\" role=\"tabpanel\" aria-labelledby=\"home-tab\"><p id=\"inner1\">Bunas</p></div>" +
              "<div class=\"tab-pane fade\" id=\"profile\" role=\"tabpanel\" aria-labelledby=\"profile-tab\"><p id=\"inner2\"></p></div>" +
              "<div class=\"tab-pane fade\" id=\"contact\" role=\"tabpanel\" aria-labelledby=\"contact-tab\">Dias</div>" +
            "</div>";

            document.getElementById('body').innerHTML = innerhtml;

            //Solo por ejemplo
            $('#inner1').html("<table class=\"table\">" +
              "<thead>" +
                "<tr>" +
                  "<th scope=\"col\">#</th>" +
                  "<th scope=\"col\">First</th>" +
                  "<th scope=\"col\">Last</th>" +
                  "<th scope=\"col\">Handle</th>" +
                "</tr>" +
              "</thead>" +
              "<tbody>" +
                "<tr>" +
                  "<th scope=\"row\">1</th>" +
                  "<td>Mark</td>" +
                  "<td>Otto</td>" +
                  "<td>@mdo</td>" +
                "</tr>" +
                "<tr>" +
                  "<th scope=\"row\">2</th>" +
                  "<td>Jacob</td>" +
                  "<td>Thornton</td>" +
                  "<td>@fat</td>" +
                "</tr>" +
                "<tr>" +
                  "<th scope=\"row\">3</th>" +
                  "<td>Larry</td>" +
                  "<td>the Bird</td>" +
                  "<td>@twitter</td>" +
                "</tr>" +
              "</tbody>" +
            "</table>");

            //Borrar Despues
            $('#inner2').html("<table class=\"table\">" +
              "<thead>" +
                "<tr>" +
                  "<th scope=\"col\">#</th>" +
                  "<th scope=\"col\">First</th>" +
                  "<th scope=\"col\">Last</th>" +
                  "<th scope=\"col\">Handle</th>" +
                "</tr>" +
              "</thead>" +
              "<tbody>" +
                "<tr>" +
                  "<th scope=\"row\">1</th>" +
                  "<td>Mark</td>" +
                  "<td>Otto</td>" +
                  "<td>@mdo</td>" +
                "</tr>" +
                "<tr>" +
                  "<th scope=\"row\">2</th>" +
                  "<td>Jacob</td>" +
                  "<td>Thornton</td>" +
                  "<td>@fat</td>" +
                "</tr>" +
                "<tr>" +
                  "<th scope=\"row\">3</th>" +
                  "<td>Larry</td>" +
                  "<td>the Bird</td>" +
                  "<td>@twitter</td>" +
                "</tr>" +
              "</tbody>" +
            "</table>");
          }
          //Si no alerta que no se encontró en la BD
          else{
            alert("Wrong email or password");
          }

          return rows;
        }
      ))
      .catch(err =>{
        console.log(err);
        conn.end();
      })
}

/*Inicia la tabla de pruebas*/
function TablaPruebas(){
  innerRow = "";
  //document.getElementById('trows').innerHTML = "";
  $('#trows').html('');
  innerRow = "<th>#</th>" +
              "<th>Name</th>" +
              "<th>Date</th>" +
              "<th>Duration</th>" +
              "<th>X</th>";

  $('#trows').html(innerRow);

  //Mando a llamar el método que va a la BD y me trae los registros
  InfoTablaTest();
}

/*Vista de Tests*/
function InfoTablaTest(){
  pool.getConnection()
  .then(conn => {
    conn.query("SELECT RSP_ID, RSD_NAME, RSD_LASTNAME, DATE_FORMAT(RSP_FECHA,\'%c/%e/%Y %h:%i:%s %p\') as RSP_FECHA, duracion_prueba FROM RESIDENCIA.rs_prueba A join RESIDENCIA.rs_datospersona B ON A.RSP_PERSONA_ID = B.RSD_ID")
    .then((rows) => {
      //console.log(rows);
      json = JSON.stringify(rows);
      //console.log(json);
      //result = json;
      //return json;
      result = rows;
      $('#tbody').html('');
      for (var i = 0; i < result.length; i++) {
        innerBody = "";

        innerBody = "<tr>" +
                    "<td>" + result[i].RSP_ID + "</td>" +
                    "<td>" + result[i].RSD_NAME + " " + result[i].RSD_LASTNAME + "</td>" +
                    "<td>" + result[i].RSP_FECHA + "</td>" +
                    "<td>" + result[i].duracion_prueba + "</td>" +
                    "<td>" + "-" + "</td>" +
                    "</tr>";

        $('#tbody').append(innerBody);
      }
    })
    .then((res) => {
      //console.log(res);
      conn.end();
    })
    .catch(err => {
      console.log(err);
      conn.end();
    })
  }).catch(err =>{
    console.log(err);
  });
  //console.log(result);
  //return result;
}

/*Vista de Pacientes*/
function TablaPacientes(){
  innerRow = "";
  //document.getElementById('trows').innerHTML = "";
  $('#trows').html('');
  innerRow = "<th>#</th>" +
              "<th>Name</th>" +
              "<th>Age</th>" +
              "<th>Gender</th>" +
              "<th>Date</th>" +
              "<th>Options</th>";

  $('#trows').html(innerRow);

  pool.getConnection()
  .then(conn => {
    conn.query("SELECT RSD_ID, RSD_NAME, RSD_LASTNAME, RSD_AGE, RSD_GENDER, DATE_FORMAT(RSD_DATE, \'%c/%e/%Y %h:%i:%s %p\') as RSD_DATE FROM RESIDENCIA.rs_datospersona")
    .then((rows) => {
      //console.log(rows);
      json = JSON.stringify(rows);
      //console.log(json);

      result = rows;
      $('#tbody').html('');
      for (var i = 0; i < result.length; i++) {
        innerBody = "";

        innerBody = "<tr>" +
                    "<td>" + result[i].RSD_ID + "</td>" +
                    "<td>" + result[i].RSD_NAME + " " + result[i].RSD_LASTNAME + "</td>" +
                    "<td>" + result[i].RSD_AGE + "</td>" +
                    "<td>" + result[i].RSD_GENDER + "</td>" +
                    "<td>" + result[i].RSD_DATE + "</td>" +
                    "<td> <button id=\"editar_" + result[i].RSD_ID + "\" onclick=\"EditarPaciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-pencil\"></i></button>" +
                    "<button id=\"consultar_" + result[i].RSD_ID + "\" onclick=\"ConsultarPaciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-success\"><i class=\"fa fa-file-text\"></i></button>" +
                    "<button id=\"eliminar_" + result[i].RSD_ID + "\" onclick=\"EliminarPaciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-danger\"><i class=\"fa fa-trash\"></i></button>" +
                    "</td>" +
                    "</tr>";

        $('#tbody').append(innerBody);
      }
    })
    .then((res) => {
      //console.log(res);
      conn.end();
    })
    .catch(err => {
      console.log(err);
      conn.end();
    })
  }).catch(err =>{
    console.log(err);
  });
}

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

function ConsultarPaciente(id){
  console.log(id);
}

function EliminarPaciente(id){
  console.log(id);
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
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          alert(res);
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
  pool.getConnection()
    .then(conn => {

      conn.query("INSERT INTO RESIDENCIA.rs_datospersona (RSD_NAME, RSD_LASTNAME, RSD_AGE, RSD_EMAIL, RSD_OCCUPATION, RSD_GENDER, RSD_DATE) " +
                "VALUES ('"+ $('#name').val() + "', '" + $('#lastname').val() + "', "+ $('#age').val() + ", '" + $('#email').val() + "', '" + $('#occupation').val() + "', '" + $('#inputState option:selected').val() + "' , '" + $('#inputBirthdate').val() + "')")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before
          // " CREATE TABLE myTable (id int, val varchar(255)) "
          //return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          alert(res);
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
