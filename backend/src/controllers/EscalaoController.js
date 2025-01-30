const sequelize = require("../models/database");
const { Op, Model, DataTypes } = require("sequelize"); // Removido o 'Sequelize', já está na importação anterior
const escalao = require("../models/escalao")(sequelize, DataTypes); // Definição do modelo

const controllers = {};

// Controller para listar todos os escalões
controllers.listar = async (req, res) => {
  try {
    const escalões = await escalao.findAll();
    
    res.status(200).json({
      success: true,
      data: escalões,
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao buscar escalões",
      error: error.message,
    });
  }
};

module.exports = controllers;
