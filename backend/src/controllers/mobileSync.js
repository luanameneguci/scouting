const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const { getUserIdFromToken } = require("./authUtil");

const controllers = {};

controllers.pagInicial = async (req, res) => {
  try {
    
    const { since } = req.query;
    const whereCondition = since ? { lastUpdated: { [Op.gt]: new Date(since) } } : {};

    const token = req.headers['authorization']?.split(' ')[1]; // Extract token after "Bearer "
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    const userId = getUserIdFromToken(token);

    const JogosUser = await models.UtilizadorJogo.findAll({
      where: {
        id_utilizador: userId, 
        ...whereCondition,        
      },
      include: [
        {
          model: models.jogo,
          attributes: ["data"],     
          where: {
            data: { [Op.gte]: new Date() }, // Ensure future or today's games are returned
          },
          include: [
            {
              model: models.JogoClube,
              as: "JogoClubes",
              include: [
                {
                  model: models.clube,
                  as: "RelatedClube",
                  attributes: ["nome"],
                },
              ],        
            },
          ],
        },
        {
            model: models.atleta,
            as:"RelatedAtleta",
            attributes: ["nome"],
            include: [
              {
                model: models.clube,
                attributes: ["nome"],
              },
              {
                model: models.escalao,
                attributes: ["designacao"],
              },
            ],         
        },
      ],
    });

    return res.status(200).json({
      JogosUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
};

/* const atleta = await models.atleta.findAll({
        include: [
          { model: models.clube, as: "clube",
            attributes: ["nome"], },
          { model: models.escalao, as: "escalao",
            attributes: ["designacao"], },
          { model: models.nacionalidade },
          { model: models.posicao },
        ],
      });
 */

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
