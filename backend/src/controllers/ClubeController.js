const express = require('express');
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const clube = require("../models/clube")(sequelize, DataTypes); // Definido o modelo de clube desta forma
const controllers = {};

// Controller para listar todos os clubes
controllers.listar = async (req, res) => {
  try {
    const clubes = await clube.findAll();
    
    return res.status(200).json({
      success: true,
      data: clubes,
    });
  } catch (error) {
    console.error("Erro:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar clubes",
      error: error.message,
    });
  }
};

module.exports = controllers;
