const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
var Relatorio = models.relatorio;
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
    // Calculate the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const now = new Date();

    // Fetch report count and unique athlete count in parallel
    const [totalReports, uniqueAthletes] = await Promise.all([
      Relatorio.count({
        where: {
          data: {
            [Op.between]: [sevenDaysAgo, now],
          },
        },
      }),
      Relatorio.count({
        distinct: true,
        col: "id_atleta",
        where: {
          data: {
            [Op.between]: [sevenDaysAgo, now],
          },
        },
      }),
    ]);

    // Send the response with the fetched data
    res.json({
      success: true,
      quantidadeRelatorios: totalReports,
      quantidadeAtletasAvaliados: uniqueAthletes,
    });
  } catch (error) {
    console.error("Error fetching relatorios data:", error);
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
