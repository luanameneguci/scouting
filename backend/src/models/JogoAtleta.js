const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('JogoAtleta', {
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_atleta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'JogoAtleta',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
