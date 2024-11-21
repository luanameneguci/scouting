var Sequelize = require('sequelize');
const sequelize = new Sequelize(
'scouting',
'postgres',
'postgres',
{
host: 'localhost',
port: '5432',
dialect: 'postgres'
}
);
module.exports = sequelize;