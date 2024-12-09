const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nacionalidadeatleta', {
    id_nacionalidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_atleta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'nacionalidadeatleta',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
