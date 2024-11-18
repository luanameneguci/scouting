const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('JogoClube', {
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'jogo',
        key: 'id_jogo'
      }
    },
    id_clube: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'clube',
        key: 'id_clube'
      }
    }
  }, {
    sequelize,
    tableName: 'JogoClube',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_jogoclube",
        unique: true,
        fields: [
          { name: "id_jogo" },
          { name: "id_clube" },
        ]
      },
      {
        name: "possui2_fk",
        fields: [
          { name: "id_jogo" },
        ]
      },
      {
        name: "possui2_pk",
        unique: true,
        fields: [
          { name: "id_jogo" },
          { name: "id_clube" },
        ]
      },
      {
        name: "possui4_fk",
        fields: [
          { name: "id_clube" },
        ]
      },
    ]
  });
};
