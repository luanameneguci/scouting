const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nacionalidadeatleta', {
    id_nacionalidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'nacionalidade',
        key: 'id_nacionalidade'
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
    tableName: 'nacionalidadeatleta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_nacionalidadeatleta",
        unique: true,
        fields: [
          { name: "id_nacionalidade" },
          { name: "id_atleta" },
        ]
      },
      {
        name: "possui3_fk",
        fields: [
          { name: "id_atleta" },
        ]
      },
      {
        name: "possui_fk",
        fields: [
          { name: "id_nacionalidade" },
        ]
      },
      {
        name: "possui_pk",
        unique: true,
        fields: [
          { name: "id_nacionalidade" },
          { name: "id_atleta" },
        ]
      },
    ]
  });
};
