const mysql = require('mysql');
const config = require('../config/config');

const connection = mysql.createConnection({
    host: config.dbhost,
    user: config.dbuser,
    database: config.dbdatabase,
    password: config.dbpassword,
    multipleStatements: true
});

module.exports = connection