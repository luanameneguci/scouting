const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
var Jogo = require("../models/jogo");
var JogoAtleta = require("../models/JogoAtleta");
var JogoClube = require("../models/JogoClube");
const clube = require("../models/clube");

const controllers = {};

controllers.criar = async (req, res) => {
  const { id_escalao, dataJogo, atletas, clubes } = req.body; // `atletas` is an array of athlete IDs

  try {
    // Step 1: Create the game
    const jogo = await Jogo.create({
      id_escalao: id_escalao,
      data: dataJogo,
    });

    // Step 2: Insert relationships into JogoAtleta
    if (atletas && atletas.length > 0) {
      const jogoAtletas = atletas.map((idAtleta) => ({
        id_jogo: jogo.id_jogo,
        id_atleta: idAtleta,
      }));
      await JogoAtleta.bulkCreate(jogoAtletas);
    }

    // Step 3: Insert relationships into JogoClube
    if (clubes && clubes.length > 0) {
      const jogoClubes = clubes.map((idClube) => ({
        id_jogo: jogo.id_jogo,
        id_clube: idClube,
      }));
      await JogoClube.bulkCreate(jogoClubes);
    }

    // Step 4: Return success response
    res.status(200).json({
      success: true,
      data: jogo,
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Jogo and its relationships.",
      error: error.message,
    });
  }
};


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

controllers.listar = async (req, res) => {
  const data = await Jogo.findAll({})
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
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
