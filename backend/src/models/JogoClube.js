const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jogoclube', {
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_clube: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'jogoclube',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
