//Todo lo que este aqui se va a cargar al inicio
$(document).ready(function(){
  $('#login').click(function(){
    Login($('#email').val(), $('#password').val());
  });
});

<<<<<<< HEAD
function Login(){
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
=======
/*Variables, Importacion de Modulus, etc*/
const mariadb = require('mariadb');
var x;

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
>>>>>>> fd55545c6fbb0a74a92cfd54bad686ceba8f4514
}
