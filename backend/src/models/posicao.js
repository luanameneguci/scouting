const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('posicao', {
    id_posicao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_funcao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    designacao: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'posicao',
    schema: 'public',
    timestamps: false,
    indexes: []
  });
};
