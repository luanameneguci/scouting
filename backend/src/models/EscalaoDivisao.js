const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EscalaoDivisao', {
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
    tableName: 'EscalaoDivisao',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
