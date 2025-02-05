const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const Jogo = require("../models/jogo")(sequelize, DataTypes);
const JogoAtleta = require("../models/JogoAtleta")(sequelize, DataTypes);
const JogoClube = require("../models/JogoClube")(sequelize, DataTypes);
const clube = require("../models/clube")(sequelize, DataTypes);
const atleta = require("../models/atleta")(sequelize, DataTypes);
const Atleta = require("../models/atleta")(sequelize, DataTypes);
const Clube = require("../models/clube")(sequelize, DataTypes);
var initModels = require("../models/init-models");
const models = initModels(sequelize);
const controllers = {};
const { subDays, addDays } = require('date-fns');


controllers.editar = async (req, res) => {
  // parameter get id
  const { id_jogo } = req.params;
  // parameter POST
  const { id_escalao, dataJogo } = req.body;
  // Update data
  const data = await Jogo.update(
    {
      id_escalao: id_escalao,
      dataJogo: dataJogo,
    },
    {
      where: { id_jogo: id_jogo },
    }
  )
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data, message: "Updated successful" });
};

const addAtletaToJogo = async (req, res) => {
  const { id_jogo, id_atleta } = req.body;

  try {
    // Step 1: Check if the jogo exists
    const jogo = await Jogo.findByPk(id_jogo);
    if (!jogo) {
      return res.status(404).json({
        success: false,
        message: "Jogo not found",
      });
    }

    // Step 2: Check if the atleta is already linked to this jogo
    const existingLink = await JogoAtleta.findOne({
      where: { id_jogo, id_atleta },
    });

    if (existingLink) {
      return res.status(400).json({
        success: false,
        message: "Atleta is already linked to this jogo.",
      });
    }

    // Step 3: Create the new relationship
    await JogoAtleta.create({ id_jogo, id_atleta });

    // Step 4: Return success response
    res.status(200).json({
      success: true,
      message: "Atleta successfully added to the jogo.",
    });
  } catch (error) {
    console.error("Error adding atleta to jogo:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add atleta to jogo.",
      error: error.message,
    });
  }
};


/* controllers.listarPorAtleta = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the game
    const jogo = await Jogo.findAll({
      where: { id_atleta: id },
      include: [
        {
          model: JogoAtleta,
          include: [{ model: Atleta, attributes: ["id_atleta", "nome"] }],
        },
        {
          model: JogoClube,
          include: [{ model: Clube, attributes: ["id_clube", "nome"] }],
        },
      ],
    });

    if (!jogo) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    res.status(200).json({
      success: true,
      data: jogo,
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch game details.",
      error: error.message,
    });
  }
}; */

controllers.listarDash = async (req, res) => {
  try {
    const currentDate = new Date();
    const thirtyDaysLater = addDays(currentDate, 30);

    const data = await models.jogo.findAll({
      where: {
        data: {
          [Op.between]: [currentDate, thirtyDaysLater],
        }
      },
      limit: 10,
      include: [
        {
          model: models.escalao,
        },
        {
          model: models.UtilizadorJogo,
          as: "UtilizadoresJogo",
          include: [
            {
              model: models.utilizador,
              as: "RelatedJogoUtilizador",
              attributes: ["nome"],
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
              attributes: ["nome"],
            },
          ],
        },
      ],
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro no servidor",
      error: error.message,
    });
  }
};

controllers.listar = async (req, res) => {
  try {


    // Fetch all games with associated data  
    const data = await models.jogo.findAll({
      include: [
        {
          model: models.atleta,

        },
        {
          model: models.clube,

        },
        {
          model: models.escalao,

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


controllers.listarByPk = async (req, res) => {
  const { id_jogo } = req.params;

  try {
    const jogo = await Jogo.findBYpK({
      where: { id_jogo: id_jogo },
    });

    if (!jogo) {
      return res
        .status(404)
        .json({ success: false, message: "Jogo não encontrado" });
    }

    const atletas = await JogoAtleta.findAll({
      where: { id_jogo: id_jogo },
      include: [
        {
          model: atleta,
          as: "atleta",
        },
      ],
    });

    const clubes = await JogoClube.findAll({
      where: { id_jogo: id_jogo },
      include: [
        {
          model: clube,
          as: "clube",
        },
      ],
    });

    res.status(200).json({ success: true, data: { equipa, atletas } }); // Responde a equipa e os atletas
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Erro no servidor",
        error: error.message,
      });
  }
};


controllers.getAtletasPorEscalao = async (req, res) => {
  const { id_escalao, id_clube1 , id_clube2 } = req.params;
 /* const where = {[Op.or]: [
    id_clube1 &&{ id_clube: +id_clube1 },
    id_clube2 &&{ id_clube: +id_clube2 }
  ] }*/
    let where = { id_escalao: +id_escalao };

    if (id_clube1 && id_clube2) {
      where.id_clube = { [Op.or]: [+id_clube1, +id_clube2] };
    } else if (id_clube1) {
      where.id_clube = +id_clube1;
    } else if (id_clube2) {
      where.id_clube = +id_clube2;
    }
  try {
    const atletas = await Atleta.findAll({
      where,
    });

    if (atletas.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Nenhum atleta encontrado para este escalão.",
      });
    }

    res.status(200).json({ success: true, data: atletas });
  } catch (error) {
    console.error("Erro ao buscar atletas:", error); // Log mais detalhado
    res.status(500).json({ success: false, message: "Erro no servidor.", error: error.message });
  }
};

controllers.addAtletaToJogo = async (req, res) => {
  const { id_jogo, id_atleta } = req.query;  // Alterado de req.body para req.query

  try {
    // Verificar se o jogo existe
    const jogo = await Jogo.findByPk(id_jogo);
    if (!jogo) {
      return res.status(404).json({
        success: false,
        message: "Jogo não encontrado",
      });
    }

    // Verificar se o atleta existe
    const atleta = await Atleta.findByPk(id_atleta);
    if (!atleta) {
      return res.status(404).json({
        success: false,
        message: "Atleta não encontrado",
      });
    }

    // Verificar se o atleta já está associado ao jogo
    const existingLink = await JogoAtleta.findOne({
      where: { id_jogo, id_atleta },
    });
    if (existingLink) {
      return res.status(400).json({
        success: false,
        message: "Atleta já está associado a este jogo",
      });
    }

    // Adicionar o atleta ao jogo
    await JogoAtleta.create({
      id_jogo,
      id_atleta,
    });

    res.status(200).json({
      success: true,
      message: "Atleta adicionado ao jogo com sucesso",
    });
  } catch (error) {
    console.error("Erro ao adicionar atleta ao jogo:", error);
    res.status(500).json({
      success: false,
      message: "Falha ao adicionar atleta ao jogo",
      error: error.message,
    });
  }
};

controllers.criarJogo = async (req, res) => {
  const { id_clube, id_clube2, id_escalao, data, jogadorTreinador } = req.body; 

  // Verificação de parâmetros obrigatórios
  if (!id_clube || !id_clube2 || !id_escalao || !data || !jogadorTreinador || !Array.isArray(jogadorTreinador)) {
    return res.status(400).json({
      success: false,
      message: 'Faltam parâmetros obrigatórios. Certifique-se de passar id_clube, id_clube2, id_escalao, data e um array jogadorTreinador.',
    });
  }

  try {
    // Criar o novo jogo
    const novoJogo = await models.jogo.create({
      id_escalao,
      data
    });

    // Associar os clubes ao jogo na tabela jogoclube
    await models.JogoClube.create(
      { id_jogo: novoJogo.id_jogo, id_clube }
    );
    await models.JogoClube.create(
        { id_jogo: novoJogo.id_jogo, id_clube: id_clube2 }
      
    );
    // Associar os jogadores e treinadores ao jogo na tabela utilizadorjogo
    await models.UtilizadorJogo.bulkCreate(
      jogadorTreinador.map(({ id_atleta, id_treinador }) => ({
        id_jogo: novoJogo.id_jogo,
        id_atleta,
        id_utilizador: id_treinador
      }))
    );

    return res.status(200).json({
      success: true,
      message: 'Jogo criado com sucesso, clubes e utilizadores associados!',
      data: novoJogo,
    });

  } catch (error) {
    console.error('Erro ao criar jogo:', error);
    return res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};





module.exports = controllers;
/*encontrar jogo
/*encontrar jogador
/* inserir jogador e jogo na tabela jogo atleta

const { Atleta, Jogo } = require('../models'); // Adjust model paths as needed

async function findGamesForAthlete(athleteId) {
  try {
    // Find the athlete and include related games
    const athlete = await Atleta.findByPk(athleteId, {
      include: [
        {
          model: Jogo,
          as: "id_jogo_jogos", // Alias defined in your `belongsToMany` for Atleta -> Jogo
        },
      ],
    });

    if (!athlete) {
      return console.log("Athlete not found");
    }

    // Display the games
    console.log("Athlete's Games:", athlete.id_jogo_jogos); // Access via alias
  } catch (error) {
    console.error("Error fetching games for athlete:", error);
  }
}

// Call the function with an athlete's ID
findGamesForAthlete(101); // Replace with a valid athlete ID
 */