const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('escalao', {
    id_escalao: {
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
    tableName: 'escalao',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
