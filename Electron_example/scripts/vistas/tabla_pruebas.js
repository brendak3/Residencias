$(document).ready(function(){
  $("#title").text("Historial de Pruebas");
  $("#myTable").DataTable();
  InfoTablaTest();
});

/*Vista de Tests*/
function InfoTablaTest(){
  pool.getConnection()
  .then(conn => {
    conn.query("SELECT RSP_ID, RSD_NAME, RSD_LASTNAME, DATE_FORMAT(RSP_FECHA,\'%c/%e/%Y %h:%i:%s %p\') as RSP_FECHA, duracion_prueba, RSP_EMOCION FROM RESIDENCIA.rs_prueba A join RESIDENCIA.rs_datospersona B ON A.RSP_PERSONA_ID = B.RSD_ID")
    .then((rows) => {
      //console.log(rows);
      json = JSON.stringify(rows);
      //console.log(json);
      //result = json;
      //return json;
      result = rows;
      $('#tbody').html('');
      for (var i = 0; i < result.length; i++) {
        $("#myTable").dataTable().fnAddData( [
            result[i].RSP_ID ,
            result[i].RSD_NAME,
            result[i].RSP_FECHA,
            result[i].duracion_prueba,
            result[i].RSP_EMOCION,
            "<button id=\"consultar_" + result[i].RSP_ID + "\" onclick=\"ConsultarPaciente(this.value)\" value=\""+ result[i].RSP_ID + "\" type=\"button\" class=\"btn btn-success\"><i class=\"fa fa-file-text\"></i></button>" +
            "<button id=\"eliminar_" + result[i].RSP_ID + "\" onclick=\"EliminarPaciente(this.value)\" value=\""+ result[i].RSP_ID + "\" type=\"button\" class=\"btn btn-danger\"><i class=\"fa fa-trash\"></i></button>" ] );


        // innerBody = "";
        //
        // innerBody = "<tr>" +
        //             "<td>" + result[i].RSP_ID + "</td>" +
        //             "<td>" + result[i].RSD_NAME + " " + result[i].RSD_LASTNAME + "</td>" +
        //             "<td>" + result[i].RSP_FECHA + "</td>" +
        //             "<td>" + result[i].duracion_prueba + "</td>" +
        //             "<td>" + result[i].RSP_EMOCION + "</td>" +
        //             "<td>"+
        //             "<button id=\"consultar_" + result[i].RSP_ID + "\" onclick=\"ConsultarPaciente(this.value)\" value=\""+ result[i].RSP_ID + "\" type=\"button\" class=\"btn btn-success\"><i class=\"fa fa-file-text\"></i></button>" +
        //             "<button id=\"eliminar_" + result[i].RSP_ID + "\" onclick=\"EliminarPaciente(this.value)\" value=\""+ result[i].RSP_ID + "\" type=\"button\" class=\"btn btn-danger\"><i class=\"fa fa-trash\"></i></button>" +
        //             "</td>"
        //             "</tr>";
        //
        // $('#body_container').append(innerBody);
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
