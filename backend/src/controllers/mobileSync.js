const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const controllers = {};

controllers.mobileSync = async (req, res) => {
    try{
        const EquipaAtleta = await models.EquipaAtleta.findAll();
    }
    catch{}
}