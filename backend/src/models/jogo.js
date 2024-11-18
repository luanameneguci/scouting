const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jogo', {
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_escalao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'escalao',
        key: 'id_escalao'
      }
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'jogo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "jogo_pk",
        unique: true,
        fields: [
          { name: "id_jogo" },
        ]
      },
      {
        name: "pertence11_fk",
        fields: [
          { name: "id_escalao" },
        ]
      },
      {
        name: "pk_jogo",
        unique: true,
        fields: [
          { name: "id_jogo" },
        ]
      },
    ]
  });
};
