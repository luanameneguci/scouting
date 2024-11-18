const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('equipa', {
    id_equipa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tipoequipa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipoequipa',
        key: 'id_tipoequipa'
      }
    }
  }, {
    sequelize,
    tableName: 'equipa',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "equipa_pk",
        unique: true,
        fields: [
          { name: "id_equipa" },
        ]
      },
      {
        name: "pertence3_fk",
        fields: [
          { name: "id_tipoequipa" },
        ]
      },
      {
        name: "pk_equipa",
        unique: true,
        fields: [
          { name: "id_equipa" },
        ]
      },
    ]
  });
};
