const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('escalaodivisao', {
    id_escalao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_divisao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'escalaodivisao',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
