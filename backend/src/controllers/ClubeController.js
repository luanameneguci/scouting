const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, literal, Model, DataTypes } = require('sequelize');
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const clubeController = {};

clubeController.listar = async (req, res) => {
    try {
        const clubes = await models.clube.findAll();
        res.status(200).json({ success: true, data: clubes });
    } catch (error) {
        console.error("Erro ao buscar clubes:", error);
        res.status(500).json({ success: false, message: 'Erro ao buscar clubes', error: error.message });
    }
};

module.exports = clubeController;
