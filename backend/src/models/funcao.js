const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funcao', {
    id_funcao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_posicao: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    designacao: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'funcao',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
