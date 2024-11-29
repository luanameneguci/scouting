const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const escalao = sequelize.define('escalao', {
    id_escalao: {
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
    tableName: 'escalao',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "escalao_pk",
        unique: true,
        fields: [
          { name: "id_escalao" },
        ]
      },
      {
        name: "pk_escalao",
        unique: true,
        fields: [
          { name: "id_escalao" },
        ]
      },
    ]
  });
};
