$(document).ready(function(){
  $("#title").text("Pacientes");
  $("#myTable").DataTable();
  GetPacientes();
});

function GetPacientes(){
  pool.getConnection()
  .then(conn => {
    conn.query("SELECT RSD_ID, RSD_NAME, RSD_LASTNAME, RSD_AGE, RSD_GENDER, DATE_FORMAT(RSD_DATE, \'%c/%e/%Y %h:%i:%s %p\') as RSD_DATE FROM RESIDENCIA.rs_datospersona")
    .then((rows) => {
      //console.log(rows);
      json = JSON.stringify(rows);
      //console.log(json);

      result = rows;
      // $('#tbody').html('');
      for (var i = 0; i < result.length; i++) {

        $("#myTable").dataTable().fnAddData( [
            result[i].RSD_ID ,
            result[i].RSD_NAME + " " + result[i].RSD_LASTNAME ,
            result[i].RSD_AGE,
            ((result[i].RSD_GENDER == 0) ? "Hombre" : "Mujer"),
            result[i].RSD_DATE,
            "<td> <button id=\"editar_" + result[i].RSD_ID + "\" onclick=\"EditarPaciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-pencil\"></i></button>" +
            "<button id=\"consultar_" + result[i].RSD_ID + "\" onclick=\"Consultar_paciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-success\"><i class=\"fa fa-file-text\"></i></button>" +
            "<button id=\"eliminar_" + result[i].RSD_ID + "\" onclick=\"Eliminar_paciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-danger\"><i class=\"fa fa-trash\"></i></button>" ] );

        // innerBody = "";
        //
        // innerBody = "<tr>" +
        //             "<td>" + result[i].RSD_ID + "</td>" +
        //             "<td>" + result[i].RSD_NAME + " " + result[i].RSD_LASTNAME + "</td>" +
        //             "<td>" + result[i].RSD_AGE + "</td>" +
        //             "<td>" + result[i].RSD_GENDER + "</td>" +
        //             "<td>" + result[i].RSD_DATE + "</td>" +
        //             "<td> <button id=\"editar_" + result[i].RSD_ID + "\" onclick=\"EditarPaciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-pencil\"></i></button>" +
        //             "<button id=\"consultar_" + result[i].RSD_ID + "\" onclick=\"Consultar_paciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-success\"><i class=\"fa fa-file-text\"></i></button>" +
        //             "<button id=\"eliminar_" + result[i].RSD_ID + "\" onclick=\"Eliminar_paciente(this.value)\" value=\""+ result[i].RSD_ID + "\" type=\"button\" class=\"btn btn-danger\"><i class=\"fa fa-trash\"></i></button>" +
        //             "</td>" +
        //             "</tr>";
        //
        // $('#tbody').append(innerBody);
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
