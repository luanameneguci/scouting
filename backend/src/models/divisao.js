const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('divisao', {
    id_divisao: {
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
    tableName: 'divisao',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "divisao_pk",
        unique: true,
        fields: [
          { name: "id_divisao" },
        ]
      },
      {
        name: "pk_divisao",
        unique: true,
        fields: [
          { name: "id_divisao" },
        ]
      },
    ]
  });
};
