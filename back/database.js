const mysql      = require('mysql');
const credentials = require('./credentials.json')
const connection = mysql.createConnection(credentials);

connection.connect();


// connection.end();

module.exports = connection
