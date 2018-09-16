const mysql = require('mysql');
const config = require('../config/config');

const connectiontesting = mysql.createConnection({
    host: config.testingdbhost,
    user: config.testingdbuser,
    database: config.testingdbdatabase,
    password: config.testingdbpassword,
    multipleStatements: true
});

module.exports = connectiontesting