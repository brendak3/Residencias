//Todo lo que este aqui se va a cargar al inicio
$(document).ready(function(){
  $('#login').click(function(){
    Login($('#email').val(), $('#password').val());
  });

  //Abrir el modal
  ModalLogin();

  $('#altausuario').click(function(){
    $('#page').attr('src', '../views/altausuario.html');
  });

  /*Tabla de usuarios*/
  $('#tablapruebas').click(function(){
    $('#page').attr('src', '../views/tablapruebas.html');
  });

  /*Tabla de datos*/
  $('#grafica').click(function(){
    $('#page').attr('src', '../views/test.html');
  });
});

/*Variables, Importacion de Modulus, etc*/
const mariadb = require('mariadb');
var x = [];
var innerhtml = "";

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


//Conexion
const pool = mariadb.createPool({
     database: 'residencia',
     host: '127.0.0.1',
     user:'root',
     password: '',
     connectionLimit: 5
});


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
