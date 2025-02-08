var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'scouting_rgm7',
    'postgres1',
    '2ukz3mKanUHGHwLeDlihtKiNll0ozn8b', //lembrete para mudar depois lol :P
    {
        host: 'dpg-cujctjd2ng1s73b4utb0-a.frankfurt-postgres.render.com',
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