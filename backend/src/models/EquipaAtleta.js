const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EquipaAtleta', {
    id_equipa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'equipa',
        key: 'id_equipa'
      }
    },
    id_atleta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'atleta',
        key: 'id_atleta'
      }
    },
    posicaoformacao: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'EquipaAtleta',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
