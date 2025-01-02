const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

// Ajustando Atleta para o modelo inicializado corretamente
var Atleta = models.atleta;
const clube = models.clube;
const escalao = models.escalao;
const statusatleta = models.statusatletum; // Corrigido o alias

const controllers = {};

// Criar um novo atleta
controllers.criar = async (req, res) => {
  const {
    id_clube,
    id_escalao,
    id_statusatleta,
    nome,
    datanascimento,
    link,
    ratingfinal,
    ratinggeral,
    nomeencarregado,
    contactoencarregado,
  } = req.body;

  const data = await Atleta.create({
    id_clube: id_clube,
    id_escalao: id_escalao,
    id_statusatleta: id_statusatleta,
    nome: nome,
    datanascimento: datanascimento,
    link: link,
    ratingfinal: ratingfinal,
    ratinggeral: ratinggeral,
    nomeencarregado: nomeencarregado,
    contactoencarregado: contactoencarregado,
  })
    .then((data) => data)
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });
  res.status(200).json({
    success: true,
    data: data,
  });
};

// Editar atleta corrigido
controllers.editar = async (req, res) => {
  const { id_atleta } = req.params;
  const {
    id_clube,
    id_escalao,
    id_statusatleta,
    nome,
    datanascimento,
    link,
    ratingfinal,
    ratinggeral,
    nomeencarregado,
    contactoencarregado,
  } = req.body;

  const data = await Atleta.update(
    {
      id_clube,
      id_escalao,
      id_statusatleta,
      nome,
      datanascimento,
      link,
      ratingfinal,
      ratinggeral,
      nomeencarregado,
      contactoencarregado,
    },
    {
      where: { id_atleta },
    }
  )
    .then(() => Atleta.findByPk(id_atleta)) // Retornar o atleta atualizado
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });
  res.status(200).json({
    success: true,
    data: data,
  });
};

// Listar todos os atletas
controllers.listar = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query; // Obtem página e tamanho por query string
    const limit = parseInt(size); // Número de registros por página
    const offset = (page - 1) * limit; // Registros a pular

    const atletas = await models.atleta.findAndCountAll({
      limit,
      offset,
      attributes: [
        "id_atleta",
        "nome",
        "datanascimento",
        "ratingfinal",
        "ratinggeral",
      ],
      include: [
        {
          model: models.clube,
          as: "clube",
          attributes: ["nome"],
        },
        {
          model: models.escalao,
          as: "escalao",
          attributes: ["designacao"],
        },
        {
          model: models.statusatleta,
          as: "statusatletum",
          attributes: ["designacao"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      data: atletas.rows, // Dados da página atual
      totalItems: atletas.count, // Total de registros na tabela
      totalPages: Math.ceil(atletas.count / limit), // Total de páginas
      currentPage: parseInt(page), // Página atual
    });
  } catch (error) {
    console.error("Erro ao listar atletas: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro ao listar atletas.", error });
  }
};

controllers.getAgesData = async (req, res) => {
  try {
    const ageRanges = [
      { range: "0-13", min: 0, max: 13 },
      { range: "14-16", min: 14, max: 16 },
      { range: "17-19", min: 17, max: 19 },
      { range: "20-22", min: 20, max: 22 },
      { range: "23+", min: 23, max: Infinity },
    ];


    // Query the database to get athlete birthdays
    const result = await sequelize.query("SELECT datanascimento FROM atleta", {
      type: sequelize.QueryTypes.SELECT, // To return raw data
    });

    // Function to calculate age from birthday
    const calculateAge = (birthday) => {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    // Check if there are any results
    if (!result || result.length === 0) {
      console.error("No athlete data found in the database.");
      return res.status(404).json({ success: false, message: "No athlete data found." });
    }

    // Total number of athletes
    const totalAthletes = result.length;
    console.log("Total athletes:", totalAthletes);

    // Calculate age distribution
    const ageData = ageRanges.map((range) => {
      const count = result.filter((athlete) => {
        const age = calculateAge(athlete.datanascimento); // Use correct column name
        console.log(`Athlete's age: ${age}, Range: ${range.range}`);
        return age >= range.min && age <= range.max;
      }).length;

      const percentage = ((count / totalAthletes) * 100).toFixed(2); // Calculate percentage
      console.log(`Range: ${range.range}, Count: ${count}, Percentage: ${percentage}`);
      return { range: range.range, count, percentage };
    });

    // Log final age distribution data
    console.log("Age distribution data:", ageData);

    // Respond with age distribution data
    res.json({ success: true, data: ageData });
  } catch (err) {
    console.error("Error in getAgesData:", err.message, err.stack);
    res.status(500).json({ success: false, message: "Database error" });
  }
};


controllers.getRatingsData = async (req, res) => {
  try {
    // Fetch the total number of athletes
    const totalAthletes = await Atleta.count();

    // Initialize an array to store results
    const data = [];
    let rating;

    for (rating = 1; rating <= 5; rating++) {
      // Count the number of athletes for the current rating
      const count = await Atleta.count({
        where: {
          ratingfinal: rating
        }
      });

      // Calculate the percentage
      const percentage = totalAthletes > 0 ? ((count / totalAthletes) * 100).toFixed(2) : 0;

      // Add the result to the array
      data.push({
        count,
        percentage: parseFloat(percentage), // Parse percentage to a float
      });
    }

    // Return the results
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching ratings data.' });
  }
};

// Apagar atleta corrigido
controllers.apagar = async (req, res) => {
  const { id_atleta } = req.body; // Corrigido para `id_atleta`

  const deleted = await Atleta.destroy({
    where: { id_atleta: id_atleta },
  }).catch((error) => {
    console.log("Erro ao apagar atleta: " + error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao apagar atleta." });
  });

  if (deleted) {
    res.json({ success: true, message: "Atleta apagado com sucesso." });
  } else {
    res
      .status(404)
      .json({ success: false, message: "Atleta não encontrado." });
  }
};

module.exports = controllers;
