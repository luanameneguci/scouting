const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EscalaoDivisao', {
    id_escalao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'escalao',
        key: 'id_escalao'
      }
    },
    id_divisao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'divisao',
        key: 'id_divisao'
      }
    }
  }, {
    sequelize,
    tableName: 'EscalaoDivisao',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pertence12_fk",
        fields: [
          { name: "id_divisao" },
        ]
      },
      {
        name: "pertence6_fk",
        fields: [
          { name: "id_escalao" },
        ]
      },
      {
        name: "pertence6_pk",
        unique: true,
        fields: [
          { name: "id_escalao" },
          { name: "id_divisao" },
        ]
      },
      {
        name: "pk_pertence6",
        unique: true,
        fields: [
          { name: "id_escalao" },
          { name: "id_divisao" },
        ]
      },
    ]
  });
};
