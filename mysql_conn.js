var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'bookuser',
  password : '111111',
  database : 'bookuser'
});

module.exports = { mysql, conn };
