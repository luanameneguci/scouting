const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PosicaoAtleta', {
    id_posicao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'posicao',
        key: 'id_posicao'
      }
    },
    id_atleta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'atleta',
        key: 'id_atleta'
      }
    }
  }, {
    sequelize,
    tableName: 'PosicaoAtleta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_posicaoatleta",
        unique: true,
        fields: [
          { name: "id_posicao" },
          { name: "id_atleta" },
        ]
      },
      {
        name: "tem3_fk",
        fields: [
          { name: "id_atleta" },
        ]
      },
      {
        name: "tem_fk",
        fields: [
          { name: "id_posicao" },
        ]
      },
      {
        name: "tem_pk",
        unique: true,
        fields: [
          { name: "id_posicao" },
          { name: "id_atleta" },
        ]
      },
    ]
  });
};
