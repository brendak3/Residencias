$(document).ready(function(){
  $('#close').click(function(){
    ipcRenderer.send('login-close', '');
  });

  $('#login').click(function(){
    TryLogin();
  });

});

const remote = require('electron').remote
let w = remote.getCurrentWindow();

const { ipcRenderer  } = require('electron');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
     database: 'residencia',
     host: '127.0.0.1',
     user:'root',
     password: 'mariposa64', //If you don't have a password leave it as empty string
     connectionLimit: 5
});


async function TryLogin() {
  let conn;
  try {
	  conn = await pool.getConnection();
	  const rows = await conn.query("SELECT RS_ID, rs_username, RS_ISADMIN FROM rs_user WHERE rs_email = '" + $('#email').val() + "' AND rs_password = '" + $('#password').val() + "'");
	  console.log(rows.length); //[ {val: 1}, meta: ... ]
    if(rows.length > 0){
      var cookieValue = JSON.stringify({userId: rows[0].RS_ID, username: rows[0].rs_username, isadmin: rows[0].RS_ISADMIN[0]});
      // Validate user credentials
      ipcRenderer.send('create-session-cookie', cookieValue);//create-session-cookie
    }
    else{
      $('#message').text("Please check email or password"); 
      $('#message').css("color", "red");
    }
  } catch (err) {
	   throw err;
  } finally {
	   if (conn) return conn.end();
  }
}
