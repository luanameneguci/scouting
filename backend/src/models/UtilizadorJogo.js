const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('utilizadorjogo', {
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_atleta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'utilizadorjogo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "utilizadorjogo_unique",
        unique: true,
        fields: [
          { name: "id_utilizador" },
          { name: "id_jogo" },
          { name: "id_atleta" },
        ]
      },
    ]
  });
};