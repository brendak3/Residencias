//Conexion
const pool = mariadb.createPool({
     database: 'residencia',
     host: '127.0.0.1',
     user:'root',
     password: '',
     connectionLimit: 5
});

function guardarDatos(){
  pool.getConnection()
    .then(conn =>
      conn.query("INSERT INTO RS_DATOSPERSONA (RSD_NAME, RSD_LASTNAME, RSD_EMAIL, RSD_GENDER) " +
      "VALUES(" + + ", " + + ", " +  + ", " +  + ")")
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
