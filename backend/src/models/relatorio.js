const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relatorio', {
    id_relatorio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    },
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jogo',
        key: 'id_jogo'
      }
    },
    id_atleta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'atleta',
        key: 'id_atleta'
      }
    },
    tecnica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    velocidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    atitudecompetitiva: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inteligencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    altura: {
      type: DataTypes.REAL,
      allowNull: false
    },
    morfologia: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    apontamentos: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'relatorio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "escreve_fk",
        fields: [
          { name: "id_utilizador" },
        ]
      },
      {
        name: "pertence5_fk",
        fields: [
          { name: "id_jogo" },
        ]
      },
      {
        name: "pertence8_fk",
        fields: [
          { name: "id_atleta" },
        ]
      },
      {
        name: "pk_relatorio",
        unique: true,
        fields: [
          { name: "id_relatorio" },
        ]
      },
      {
        name: "relatorio_pk",
        unique: true,
        fields: [
          { name: "id_relatorio" },
        ]
      },
    ]
  });
};
