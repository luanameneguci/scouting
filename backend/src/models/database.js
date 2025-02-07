var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'scouting',
    'postgres',
    'qyX186wuT', //lembrete para mudar depois lol :P
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);

sequelize.authenticate()
    .then(() => console.log('Conectado à base de dados!'))
    .catch(err => console.error('Erro ao conectar à base de dados:', err));

module.exports = sequelize;