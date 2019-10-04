//Todo lo que este aqui se va a cargar al inicio
$(document).ready(function(){
  $('#login').click(function(){
    Login($('#email').val(), $('#password').val());
  });
});

/*Variables, Importacion de Modulus, etc*/
const mariadb = require('mariadb');
var x = [];
var innerhtml = "";

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

function Login2(){
  if ($('#email').val()=='abi_645@hotmail.com' || $('#email').val()=='barbozabrenda3@gmail.com') {
    console.log($('#email').val());
    document.getElementById('cuerpo').innerHTML='';
    var innerhtml='';
    innerhtml+="<div class=\"row\">"+
    "<table class=\"table\">"+
    "<thead>"+
    "<tr>"+
    "<th scope=\"col\">id</th>"+
    "<th scope=\"col\">nombre</th>"+
    "</tr>"+
    "</thead>"+
    "</table>"+
    "</div>";
    document.getElementById('cuerpo').innerHTML=innerhtml;
  }
}
