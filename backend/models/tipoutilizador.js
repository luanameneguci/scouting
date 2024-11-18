const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipoutilizador', {
    id_tipoutilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    designacao: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipoutilizador',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipoutilizador",
        unique: true,
        fields: [
          { name: "id_tipoutilizador" },
        ]
      },
      {
        name: "tipoutilizador_pk",
        unique: true,
        fields: [
          { name: "id_tipoutilizador" },
        ]
      },
    ]
  });
};
