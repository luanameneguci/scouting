const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('JogoAtleta', {
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'jogo',
        key: 'id_jogo'
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
    tableName: 'JogoAtleta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "joga2_fk",
        fields: [
          { name: "id_atleta" },
        ]
      },
      {
        name: "joga_fk",
        fields: [
          { name: "id_jogo" },
        ]
      },
      {
        name: "joga_pk",
        unique: true,
        fields: [
          { name: "id_jogo" },
          { name: "id_atleta" },
        ]
      },
      {
        name: "pk_jogoatleta",
        unique: true,
        fields: [
          { name: "id_jogo" },
          { name: "id_atleta" },
        ]
      },
    ]
  });
};
