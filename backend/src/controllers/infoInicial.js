
const { Op } = require('sequelize');
const sequelize = require("../models/database");
const initModels = require('../models/init-models');
const models = initModels(sequelize);

const controllers = {};

controllers.InsertsIniciais = async (req, res) => {


}

module.exports = controllers;