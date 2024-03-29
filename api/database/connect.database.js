const mysql = require('mysql');

//connection to db
const con = mysql.createConnection({
    host: "balenoupgdfsd3lf0k3j-mysql.services.clever-cloud.com",
    user: "ugrnvr7gxsbejgoe",
    password: "1s90rsBGJd9e6kCcyvir",
    database: "balenoupgdfsd3lf0k3j"
});


con.connect(function (err) {
    // error exception 
    if (err) {
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 10000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
                                         // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    else{
        console.log("Connected to Database!");
    }
});


con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
});

module.exports = con;