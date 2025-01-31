const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizadorjogo', {
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,

    },
   id_atleta:{
    type: DataTypes.INTEGER,
    allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'utilizadorjogo',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
