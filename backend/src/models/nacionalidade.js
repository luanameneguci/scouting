const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nacionalidade', {
    id_nacionalidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    designacao: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    urlbandeira: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    abreviatura: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'nacionalidade',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "nacionalidade_pk",
        unique: true,
        fields: [
          { name: "id_nacionalidade" },
        ]
      },
      {
        name: "pk_nacionalidade",
        unique: true,
        fields: [
          { name: "id_nacionalidade" },
        ]
      },
    ]
  });
};
