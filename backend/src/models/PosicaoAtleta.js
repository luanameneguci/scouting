const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posicaoatleta', {

  }, {
    sequelize,
    tableName: 'posicaoatleta',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
