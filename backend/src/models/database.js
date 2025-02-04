var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'scouting',
    'postgres',
    '123', // postgres | Se estiver isto aqui, é porque me esqueci de meter "postgres" outra vez, desculpem T-T  ~Sliced
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);
module.exports = sequelize;