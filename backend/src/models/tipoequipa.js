const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipoequipa', {
    id_tipoequipa: {
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
    tableName: 'tipoequipa',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipoequipa",
        unique: true,
        fields: [
          { name: "id_tipoequipa" },
        ]
      },
      {
        name: "tipoequipa_pk",
        unique: true,
        fields: [
          { name: "id_tipoequipa" },
        ]
      },
    ]
  });
};