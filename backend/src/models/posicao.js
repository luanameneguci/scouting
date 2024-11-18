const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posicao', {
    id_posicao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    designacao: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'posicao',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_posicao",
        unique: true,
        fields: [
          { name: "id_posicao" },
        ]
      },
      {
        name: "posicao_pk",
        unique: true,
        fields: [
          { name: "id_posicao" },
        ]
      },
    ]
  });
};
