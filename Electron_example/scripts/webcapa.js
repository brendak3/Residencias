const mariadb = require('mariadb');
const pool = mariadb.createPool({
     database: 'residencia',
     host: '127.0.0.1',
     user:'root',
     password: '',
     connectionLimit: 5
});

function SelectData(query){
  pool.getConnection()
    .then(conn =>
      conn.query(query)
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

//Ejemplo
function Ejemplo(){
  pool.getConnection()
      .then(conn => {

        conn.query("SELECT * FROM RS_USER")
          .then((rows) => {
            console.log(rows); //[ {val: 1}, meta: ... ]
            //Table must have been created before
            // " CREATE TABLE myTable (id int, val varchar(255)) "
            return true;/*conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"])*/;
          })
          .then((res) => { //Ins
            console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
            conn.end();
          })
          .catch(err => {
            //handle error
            console.log(err);
            conn.end();
          })

      }).catch(err => {
        //not connected
  });
}
