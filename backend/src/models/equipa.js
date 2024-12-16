const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('equipa', {
    id_equipa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_tipoequipa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_escalao: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_divisao: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'equipa',
    schema: 'public',
    timestamps: false,
    indexes: []
  });
};
