const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('divisao', {
    id_divisao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    designacao: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'divisao',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
