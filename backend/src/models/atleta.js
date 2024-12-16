const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('atleta', {
    id_atleta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, 
    },
    id_clube: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_escalao: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_statusatleta: {
      type: DataTypes.INTEGER,
      allowNull: true
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
      allowNull: true
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
      allowNull: true
    },
    contactoencarregado: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'atleta',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
