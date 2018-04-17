const mysql      = require('mysql');
const credentials = require('./credentials.json')
const connection = mysql.createConnection(credentials);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();