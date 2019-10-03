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
            innerhtml = "<div class=\"container\">" +
                          "<nav>" +
                              "<div class=\"nav nav-tabs\" id=\"nav-tab\" role=\"tablist\">" +
                                "<a class=\"nav-item nav-link active\" id=\"nav-home-tab\" data-toggle=\"tab\" href=\"#nav-home\" role=\"tab\" aria-controls=\"nav-home\" aria-selected=\"true\">Home</a>" +
                                "<a class=\"nav-item nav-link\" id=\"nav-profile-tab\" data-toggle=\"tab\" href=\"#nav-profile\" role=\"tab\" aria-controls=\"nav-profile\" aria-selected=\"false\">Profile</a>"+
                                "<a class=\"nav-item nav-link\" id=\"nav-contact-tab\" data-toggle=\"tab\" href=\"#nav-contact\" role=\"tab\" aria-controls=\"nav-contact\" aria-selected=\"false\">Contact</a>" +
                              "</div>" +
                          "</nav>"+
                          "<div class=\"tab-content\" id=\"nav-tabContent\">" +
                            "<div class=\"tab-pane fade show active\" id=\"nav-home\" role=\"tabpanel\" aria-labelledby=\"nav-home-tab\">" +
                                "<table class=\"table\"><thead><tr><th>Abiel</th></tr></thead><tbody><tr><th>23</th></tr></tbody></table>"
                            "</div>" +
                            "<div class=\"tab-pane fade\" id=\"nav-profile\" role=\"tabpanel\" aria-labelledby=\"nav-profile-tab\">" +
                              "<table class=\"table\"><thead><tr><th>Abiel</th></tr></thead><tbody><tr><th>23</th></tr></tbody></table>" +
                            "</div>" +
                            "<div class=\"tab-pane fade\" id=\"nav-contact\" role=\"tabpanel\" aria-labelledby=\"nav-contact-tab\">...</div>" +
                          "</div>" +
                        "</div>";

            document.getElementById('body').innerHTML = innerhtml;
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
