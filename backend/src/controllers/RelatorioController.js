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
  const { page } = req.params;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await models.relatorio.findAndCountAll({
      include: [
        {
          model: models.atleta,

        },
        {
          model: models.jogo,
          include: [{
            model: models.JogoClube,
            as: "JogoClubes",
            include: [
              {
                model: models.clube,
                as: "RelatedClube",
                attributes: ["nome"],
              },
            ],
          }]
        },
        {
          model: models.utilizador
        }
      ],
      order: [['data', 'DESC']],
      limit: limit,
      offset: offset,
      group: ['relatorio.id_relatorio']

    })
    const totalPages = Math.ceil(count.length / limit);

    return res.status(200).json({ success: true, relatorios: rows, totalPages:totalPages });
  }
  catch (e) {
    return res.status(500).json({ message: e.message })
  }
};

controllers.relatoriosData = async (req, res) => {
  try {
    // Calculate the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const now = new Date();

    // Fetch report count and unique athlete count in parallel
    const data = await Promise.all([
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
      data
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
    where: { id_relatorio: id_relatorio }
  })
  res.json({ success: true, deleted: del });
}
/*
controllers.listar = async (req, res) => {
  try {
    const data = await Relatorio.findAll({
      attributes: [
        'id_relatorio',
        'data',
        [sequelize.literal(`CASE WHEN atleta.id_statusatleta IS NOT NULL THEN 'Confirmado' ELSE 'Não Confirmado' END`), 'confirmado'],
        [sequelize.col('atleta.nome'), 'nome_atleta'],
        [sequelize.col('utilizador.nome'), 'nome_treinador'],
        [sequelize.col('atleta.id_clube'), 'clube_id'] // Alterado para ID temporariamente
      ],
      include: [
        {
          model: models.atleta,
          as: 'atleta',
          attributes: []
        },
        {
          model: models.utilizador,
          as: 'utilizador', // Verifique se este alias está correto
          attributes: []
        }
      ],
      raw: true
    });

    // Formatar data (será apenas data pois o campo é DATEONLY)
    const formattedData = data.map(relatorio => ({
      ...relatorio,
      data: relatorio.data.toISOString().split('T')[0] // Formato YYYY-MM-DD
    }));

    res.json({ success: true, data: formattedData });
  } catch (error) {
    console.error("Erro ao listar relatórios:", error);
    res.status(500).json({ success: false, message: "Erro ao listar relatórios." });
  }
};*/

// Testando
controllers.listarPorAtleta = async (req, res) => {
  const { id_atleta } = req.params;
  try {
    const data = await Relatorio.findAll({
      where: { id_atleta: id_atleta },
      include: [{
        model: models.utilizador,
        attributes: ['nome']
      }],
      attributes: ['id_relatorio', 'data', 'morfologia', 'apontamentos'],
      raw: true
    });

    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Erro ao listar relatórios por atleta:", error);
    res.status(500).json({ success: false, message: "Erro ao listar relatórios." });
  }
};

module.exports = controllers;
