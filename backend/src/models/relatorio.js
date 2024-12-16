const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relatorio', {
    id_relatorio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_jogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_atleta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tecnica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    velocidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    atitudecompetitiva: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inteligencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    altura: {
      type: DataTypes.REAL,
      allowNull: false
    },
    morfologia: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    apontamentos: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'relatorio',
    schema: 'public',
    timestamps: false,
    indexes: [
    ]
  });
};
