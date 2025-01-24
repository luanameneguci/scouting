var initModels = require("../models/init-models");
var models = initModels(sequelize);
const controllers = {};

controllers.listar = async (req, res) => {
    try {
  
 //-------------------------------------------------------------------NÃO MEXER AQUI
      const data = await models.escalao.findAll({
        include: [
          {
            model: models.JogoAtleta,
            as: "JogoAtletas",
            include: [
              {
                model: models.atleta,
                as: "RelatedAtleta",
              },
            ],
          },
          {
            model: models.JogoClube,
            as: "JogoClubes",
            include: [
              {
                model: models.clube,
                as: "RelatedClube",
              },
            ],
          },
        ],
      });
          // Respond with fetched data
    res.status(200).json({ success: true, data });
} catch (error) {
  // Handle errors
  res.status(500).json({
    success: false,
    message: "Erro no servidor",
    error: error.message,
  });
}
};

      module.exports = controllers;