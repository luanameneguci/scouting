const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statusatleta', {
    id_statusatleta: {
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
    tableName: 'statusatleta',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
