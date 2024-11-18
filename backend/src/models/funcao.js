const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funcao', {
    id_funcao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_posicao: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'posicao',
        key: 'id_posicao'
      }
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
      {
        name: "desempenha_fk",
        fields: [
          { name: "id_posicao" },
        ]
      },
      {
        name: "funcao_pk",
        unique: true,
        fields: [
          { name: "id_funcao" },
        ]
      },
      {
        name: "pk_funcao",
        unique: true,
        fields: [
          { name: "id_funcao" },
        ]
      },
    ]
  });
};
