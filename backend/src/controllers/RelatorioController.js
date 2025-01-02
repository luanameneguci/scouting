const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
var Relatorio = require("../models/relatorio");

const controllers = {};

controllers.criar = async (req, res) => {
  const {
    id_utilizador,
    id_jogo,
    id_atleta,
    tecnica,
    velocidade,
    atitudecompetitiva,
    inteligencia,
    altura,
    morfologia,
    apontamentos,
  } = req.body;

  const data_criacao = new Date();

  const data = await Relatorio.create({
    id_utilizador: id_utilizador,
    id_jogo: id_jogo,
    id_atleta: id_atleta,
    tecnica: tecnica,
    velocidade: velocidade,
    atitudecompetitiva: atitudecompetitiva,
    inteligencia: inteligencia,
    altura: altura,
    morfologia: morfologia,
    apontamentos: apontamentos,
    data: data_criacao
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });
  // return res
  res.status(200).json({
    success: true,
    data: data,
  });
};

controllers.getRelatoriosData = async (req,res) =>{
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Subtract 7 days from today

    // Get the count of relatorios created in the last 7 days
    const count = await Relatorio.count({
      where: {
        data_criacao: {
          [Op.between]: [sevenDaysAgo, new Date()], // Between 7 days ago and now
        },
      },
    });

    res.json({ success: true, count: count });
  } catch (error) {
    console.error("Error fetching relatorio count:", error);
    res.status(500).json({ success: false, message: "Erro ao contar relatórios." });
  }
};

controllers.listarPorAtleta = async (req, res) => {
  const { id_atleta } = req.params;
  const data = await Relatorio.findAll({
    where: { id_atleta: id_atleta },
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.listar = async (req, res) => {
  const data = await Relatorio.findAll({})
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.relatoriosData = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const count = await Relatorio.count({
      where: {
        data_criacao: {
          [Op.between]: [sevenDaysAgo, new Date()], // Between 7 days ago and now
        },
      },
    });

    // Count distinct id_atleta in the last 7 days
    const uniqueAthletesCount = await Relatorio.count({
      distinct: true,
      col: "id_atleta", // Specify the column for distinct count
      where: {
        data_criacao: {
          [Op.between]: [sevenDaysAgo, new Date()], // Only consider records from the last 7 days
        },
      },
    });

    res.json({ success: true, uniqueAthletesCount: uniqueAthletesCount, count: count });
  } catch (error) {
    console.error("Error fetching unique athletes count:", error);
    res.status(500).json({ success: false, message: "Erro ao listar relatórios." });
  }
};

controllers.apagar = async (req, res) => {
    // parâmetros por post
    const { id_relatorio } = req.body;
    // delete por sequelize
    const del = await Relatorio.destroy({
    where: { id_relatorio: id_relatorio}
    })
    res.json({success:true,deleted:del});
    }


module.exports = controllers;
