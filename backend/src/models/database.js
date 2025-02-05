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

sequelize.authenticate()
    .then(() => console.log('Conectado à base de dados!'))
    .catch(err => console.error('Erro ao conectar à base de dados:', err));

module.exports = sequelize;