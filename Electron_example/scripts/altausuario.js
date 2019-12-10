$(document).ready(function(){
  document.getElementById('page').onload = function () {
     const iframeWin = document.getElementById('page').contentWindow
     iframeWin.require = window.require
  }
  $('#submit').click(function(){
    SaveUser();
  });
});
//const mariadb = require('mariadb');
//Conexion
const pool = mariadb.createPool({
     database: 'residencia',
     host: '127.0.0.1',
     user:'root',
     password: '',
     connectionLimit: 5
});

function SaveUser(){
  pool.getConnection()
    .then(conn =>
      conn.query("INSERT INTO RS_DATOSPERSONA (RSD_NAME, RSD_LASTNAME, RSD_EMAIL, RSD_GENDER) " +
      "VALUES(" + $('#name').val() + ", " + $('#lastname').val() + ", " + $('#email').val() + ", " + $('#name').val() + ")")
        .then((rows) => {
          conn.end();
          return rows;
        }
      ))
      .catch(err =>{
        console.log(err);
        conn.end();
      })
}
