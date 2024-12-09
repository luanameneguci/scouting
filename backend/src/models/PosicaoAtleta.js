const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PosicaoAtleta', {
    id_posicao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_atleta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
  
    }
  }, {
    sequelize,
    tableName: 'PosicaoAtleta',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
