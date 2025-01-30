const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const controllers = {};

controllers.mobileSync = async (req, res) => {
    try{
        const EquipaAtleta = await models.EquipaAtleta.findAll();
        const EscalaoDivisao = await models.EscalaoDivisao.findAll();
        const JogoAtleta = await models.JogoAtleta.findAll();
        const JogoClube = await models.JogoClube.findAll();
        const UtilizadorJogo = await models.UtilizadorJogo.findAll();
        const atleta = await models.atleta.findAll();
        const clube = await models.clube.findAll();
        const divisao = await models.divisao.findAll();
  
    }
    catch{}
}