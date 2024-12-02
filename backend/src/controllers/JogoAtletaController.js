var Jogo = require("../models/jogo");
var Atleta = require("../models/atleta");

const controllers = {};

controllers.criar = async (req, res) => {
    const { id_jogo, atletas } = req.params; // `atletas` is an array of athlete IDs
  
    try {
        if (atletas && atletas.length > 0) {
            const jogoAtletas = atletas.map((idAtleta) => ({
              id_jogo: id_jogo,
              id_atleta: idAtleta,
            }));
            await JogoAtleta.bulkCreate(jogoAtletas);
          }
    
        res.status(200).json({
          success: true,
          data: jogo,
        });
      } catch (error) {
        console.error("Erro:", error);
        res.status(500).json({
          success: false,
          message: "Failed to inserto Atleta into Jogo.",
          error: error.message,
        });
      }
    };  

    module.exports = controllers;