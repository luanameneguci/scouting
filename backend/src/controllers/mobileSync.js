const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const controllers = {};

controllers.SyncAtletas = async (req, res) => {
  try {

    const clube = await models.clube.findAll();    
    const escalao = await models.escalao.findAll();
    const statusatleta = await models.statusatleta.findAll();
    const nacionalidade = await models.nacionalidade.findAll();
    const posicao = await models.posicao.findAll();     
    const atleta = await models.atleta.findAll({
        include: [
          { model: models.clube, as: "clube",
            attributes: ["nome"], },
          { model: models.escalao, as: "escalao",
            attributes: ["designacao"], },
          { model: models.statusatleta },
          { model: models.nacionalidade },
          { model: models.posicao },
        ],
      });
      const nacionalidadeatleta = await models.nacionalidadeatleta.findAll();
      const posicaoatleta = await models.PosicaoAtleta.findAll();
      const funcao = await models.funcao.findAll();

      return res.status(200).json({
        success: true, clube, escalao, statusatleta, nacionalidade,
        posicao, nacionalidadeatleta, atleta, posicaoatleta, funcao
      });} catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
      }
};

controllers.SyncJogos = async (req, res) => {
    try {
        const jogo = await models.jogo.findAll();  
        const JogoAtleta = await models.jogoatleta.findAll();
        const JogoClube = await models.jogoclube.findAll();
        const utilizadores = await models.utilizador.findAll();
        const UtilizadorJogo = await models.utilizadorjogo.findAll();
        const notificacoes = await models.notificacoes.findAll();
     
    } catch {}
  };

module.exports = controllers;