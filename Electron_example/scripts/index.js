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
      conn.query("SELECT COUNT(*) FROM RS_USER WHERE RS_EMAIL = '" + email + "' AND RS_PASSWORD = '" + password + "'")
        .then((rows) => {
          conn.end();
          x = rows;
          return rows;
        }
      ))
      .catch(err =>{
        console.log(err);
        conn.end();
      })

  console.log(x);

  if (x.length > 0) {
    document.getElementById('body').innerHTML = "";
    innerhtml = "<div class=\"container\">" +
                  "<div class=\"row\">" +
                    "<>"
                  "</div>" +
                "</div>";

    document.getElementById('body').innerHTML = innerhtml;
  }
  else{
    alert("Wrong email or password");
  }
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
