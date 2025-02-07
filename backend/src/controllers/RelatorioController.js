const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
var Relatorio = models.relatorio;
const controllers = {};
const RelatorioController = {};

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

  RelatorioController.criar = async (req, res) => {
    try {
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

     // Validar campos obrigatórios
    if (!id_utilizador || !id_jogo || !id_atleta) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }
    // Criar o relatório na base de dados
    const novoRelatorio = await models.relatorio.create({
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
    });

    return res.status(201).json({
      success: true,
      message: "Relatório criado com sucesso.",
      data: novoRelatorio,
    });
  } catch (error) {
    console.error("Erro ao criar relatório:", error.message);
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

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

    return res.status(200).json({ success: true, relatorios: rows, totalPages: totalPages });
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
  const { page = 1, limit = 5 } = req.query; // Define padrão de 5 relatórios por página
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Relatorio.findAndCountAll({
      where: { id_atleta: id_atleta },
      include: [{
        model: models.utilizador,
        attributes: ['nome']
      }],
      attributes: ['id_relatorio', 'data', 'morfologia', 'apontamentos'],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['data', 'DESC']],
      raw: true
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: rows,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Erro ao listar relatórios por atleta:", error);
    res.status(500).json({ success: false, message: "Erro ao listar relatórios." });
  }
};


controllers.getMonthlyAverageRatings = async (req, res) => {
  try {
    const { id_atleta } = req.params;
    // Leia o nome do campo da query string
    const { campo } = req.query; // ex.: 'velocidade', 'tecnica', etc.

    // Se não for enviado campo, podemos definir um padrão
    const campoParaMedia = campo || "tecnica";

    // Exemplo para Postgres (usando TO_CHAR)
    const monthlyAverages = await Relatorio.findAll({
      attributes: [
        [sequelize.fn("TO_CHAR", sequelize.col("data"), "YYYY-MM"), "mes"],
        [sequelize.fn("AVG", sequelize.col(campoParaMedia)), "mediaMensal"],
      ],
      where: {
        id_atleta: id_atleta,
      },
      group: [sequelize.fn("TO_CHAR", sequelize.col("data"), "YYYY-MM")],
      order: [sequelize.literal('"mes"')],
    });

    return res.status(200).json({
      success: true,
      data: monthlyAverages,
      campo: campoParaMedia, // só pra avisar qual campo foi usado
    });
  } catch (error) {
    console.error("Erro getMonthlyAverageRatings:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao obter médias mensais de relatórios.",
      error: error.message,
    });
  }
};


// PEGA OS ULTIMOS VALORES POSTADOS
controllers.getLatestRatingsByAtleta = async (req, res) => {
  try {
    const { id_atleta } = req.params;

    // Buscar o relatório mais recente desse atleta
    const latestRelatorio = await Relatorio.findOne({
      where: { id_atleta: id_atleta },
      order: [['data', 'DESC']], // Ordenar pela data mais recente
      attributes: ['tecnica', 'velocidade', 'atitudecompetitiva', 'inteligencia', 'data']
    });

    if (!latestRelatorio) {
      return res.status(404).json({ success: false, message: "Nenhum relatório encontrado para esse atleta." });
    }

    return res.status(200).json({
      success: true,
      data: latestRelatorio
    });

  } catch (error) {
    console.error("Erro getLatestRatingsByAtleta:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao obter os últimos valores gravados do atleta.",
      error: error.message
    });
  }
};




// controllers.getMonthlyAverageByAttribute
controllers.getMonthlyAverageByAttribute = async (req, res) => {
  try {
    const { id_atleta } = req.params;
    const { campo } = req.query;

    // Se não vier na query, padrão é "tecnica"
    const atributo = campo || "tecnica";

    // Versão para PostgreSQL, agrupando data por YYYY-MM
    const monthlyAverages = await Relatorio.findAll({
      attributes: [
        // Converte data para 'YYYY-MM'
        [sequelize.fn("TO_CHAR", sequelize.col("data"), "YYYY-MM"), "mes"],
        // Faz a média do campo escolhido (tecnica, velocidade etc.)
        [sequelize.fn("AVG", sequelize.col(atributo)), "mediaMensal"]
      ],
      where: { id_atleta: id_atleta },
      group: [sequelize.fn("TO_CHAR", sequelize.col("data"), "YYYY-MM")],
      order: [sequelize.literal('"mes"')]
    });

    // Se estiver usando MySQL, troque para DATE_FORMAT, ex.:
    // [sequelize.fn('DATE_FORMAT', sequelize.col('data'), '%Y-%m'), 'mes'],

    return res.status(200).json({
      success: true,
      data: monthlyAverages
    });
  } catch (error) {
    console.error("Erro getMonthlyAverageByAttribute:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao obter médias mensais do atributo.",
      error: error.message
    });
  }
};

controllers.getRelatorio = async (req, res) => {
  const { id } = req.params;
  try {
    const relatorio = await models.relatorio.findOne({
      where: { id_relatorio: id }, include:
        [{ model: models.atleta },
        { model: models.utilizador },
        {
          model: models.jogo,
          include: [{ model: models.clube, through: { attributes: [] } }]
        }]
    });

    if (!relatorio) {
      return res.status(404).json({
        success: false,
        message: "Relatório não encontrado."
      });
    }

    return res.status(200).json(relatorio);
  } catch (error) {
    console.error("Erro getRelatorio:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao procurar relatório.",
      error: error.message
    });
  }
};


module.exports = controllers;
