const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statusatleta', {
    id_statusatleta: {
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
    tableName: 'statusatleta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_statusatleta",
        unique: true,
        fields: [
          { name: "id_statusatleta" },
        ]
      },
      {
        name: "statusatleta_pk",
        unique: true,
        fields: [
          { name: "id_statusatleta" },
        ]
      },
    ]
  });
};
