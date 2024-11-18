const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizador', {
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tipoutilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipoutilizador',
        key: 'id_tipoutilizador'
      }
    },
    nome: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'utilizador',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_utilizador",
        unique: true,
        fields: [
          { name: "id_utilizador" },
        ]
      },
      {
        name: "tem2_fk",
        fields: [
          { name: "id_tipoutilizador" },
        ]
      },
      {
        name: "utilizador_pk",
        unique: true,
        fields: [
          { name: "id_utilizador" },
        ]
      },
    ]
  });
};
