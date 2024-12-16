const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipoequipa', {
    id_tipoequipa: {
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
    tableName: 'tipoequipa',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
