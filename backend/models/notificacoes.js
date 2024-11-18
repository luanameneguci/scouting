const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificacoes', {
    id_notificacao: {
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
    data: {
      type: DataTypes.DATE,
      allowNull: false
    },
    texto: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'notificacoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notificacoes_pk",
        unique: true,
        fields: [
          { name: "id_notificacao" },
        ]
      },
      {
        name: "pk_notificacoes",
        unique: true,
        fields: [
          { name: "id_notificacao" },
        ]
      },
      {
        name: "recebe_fk",
        fields: [
          { name: "id_utilizador" },
        ]
      },
    ]
  });
};
