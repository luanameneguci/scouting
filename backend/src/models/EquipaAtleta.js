const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const EquipaAtleta = sequelize.define('EquipaAtleta', {
    id_equipa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'equipa',
        key: 'id_equipa'
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
    },
    posicaoformacao: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'EquipaAtleta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pertence2_fk",
        fields: [
          { name: "id_equipa" },
        ]
      },
      {
        name: "pertence2_pk",
        unique: true,
        fields: [
          { name: "id_equipa" },
          { name: "id_atleta" },
        ]
      },
      {
        name: "pertence4_fk",
        fields: [
          { name: "id_atleta" },
        ]
      },
      {
        name: "pk_pertence2",
        unique: true,
        fields: [
          { name: "id_equipa" },
          { name: "id_atleta" },
        ]
      },
    ]
  });
};
