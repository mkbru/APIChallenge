const mysql = require('mysql');
const config = require('../config/config');

const connection = mysql.createConnection({
    host: config.testingdbhost,
    user: config.testingdbuser,
    database: config.testingdbdatabase,
    password: config.testingdbpassword,
    multipleStatements: true
});

module.exports = connectiontesting