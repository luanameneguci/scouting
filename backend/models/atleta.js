const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('atleta', {
    id_atleta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_clube: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clube',
        key: 'id_clube'
      }
    },
    id_escalao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'escalao',
        key: 'id_escalao'
      }
    },
    id_statusatleta: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'statusatleta',
        key: 'id_statusatleta'
      }
    },
    nome: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    datanascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    ratingfinal: {
      type: DataTypes.REAL,
      allowNull: true
    },
    ratinggeral: {
      type: DataTypes.REAL,
      allowNull: true
    },
    nomeencarregado: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    contactoencarregado: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'atleta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "atleta_pk",
        unique: true,
        fields: [
          { name: "id_atleta" },
        ]
      },
      {
        name: "pertence7_fk",
        fields: [
          { name: "id_escalao" },
        ]
      },
      {
        name: "pertence9_fk",
        fields: [
          { name: "id_statusatleta" },
        ]
      },
      {
        name: "pertence_fk",
        fields: [
          { name: "id_clube" },
        ]
      },
      {
        name: "pk_atleta",
        unique: true,
        fields: [
          { name: "id_atleta" },
        ]
      },
    ]
  });
};
