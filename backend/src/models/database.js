var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'scouting',
    'postgres',
    'qyX186wuT', // postgres
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);
module.exports = sequelize;