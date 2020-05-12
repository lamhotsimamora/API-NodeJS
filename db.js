var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_api_users"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;