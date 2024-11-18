const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clube', {
    id_clube: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'clube',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clube_pk",
        unique: true,
        fields: [
          { name: "id_clube" },
        ]
      },
      {
        name: "pk_clube",
        unique: true,
        fields: [
          { name: "id_clube" },
        ]
      },
    ]
  });
};
