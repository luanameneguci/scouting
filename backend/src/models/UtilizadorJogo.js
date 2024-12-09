const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UtilizadorJogo', {
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,

    },
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,

    }
  }, {
    sequelize,
    tableName: 'UtilizadorJogo',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
