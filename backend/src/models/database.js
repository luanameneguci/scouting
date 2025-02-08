var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'scouting_ndx2',
    'postgres1',
    'zwUIicku5eF7Gi9wxHczQNd8IsAeBc3s', //lembrete para mudar depois lol :P
    {
        host: 'dpg-cujknpbv2p9s7382ngsg-a.frankfurt-postgres.render.com',
        port: '5432',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

sequelize.authenticate()
    .then(() => console.log('Conectado à base de dados!'))
    .catch(err => console.error('Erro ao conectar à base de dados:', err));

sequelize.sync()
    .then(() => console.log('Tabelas criadas com sucesso!'))
    .catch(err => console.error('Erro ao criar tabelas:', err));
module.exports = sequelize;