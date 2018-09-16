const Sequelize = require('sequelize');


const sequelize = new Sequelize('sql9256245', 'sql9256245', 'nIVhMgZBEV', {
    host: 'sql9.freemysqlhosting.net',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;