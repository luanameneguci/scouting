const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jogo', {
    id_jogo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_escalao: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'jogo',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
