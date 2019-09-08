//Todo lo que este aqui se va a cargar al inicio
$(document).ready(function(){
  $('#login').click(function(){
    Login();
  });
});

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
}
