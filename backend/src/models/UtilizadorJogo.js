const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UtilizadorJogo', {
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    },
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'jogo',
        key: 'id_jogo'
      }
    }
  }, {
    sequelize,
    tableName: 'UtilizadorJogo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pertence10_fk",
        fields: [
          { name: "id_utilizador" },
        ]
      },
      {
        name: "pertence10_pk",
        unique: true,
        fields: [
          { name: "id_utilizador" },
          { name: "id_jogo" },
        ]
      },
      {
        name: "pertence13_fk",
        fields: [
          { name: "id_jogo" },
        ]
      },
      {
        name: "pk_pertence10",
        unique: true,
        fields: [
          { name: "id_utilizador" },
          { name: "id_jogo" },
        ]
      },
    ]
  });
};
