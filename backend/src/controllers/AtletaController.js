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
    const atletas = await models.atleta.findAll({
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
          as: "clube", // Alias correto para clube
          attributes: ["nome"],
        },
        {
          model: models.escalao,
          as: "escalao", // Alias correto para escalao
          attributes: ["designacao"],
        },
        {
          model: models.statusatleta,
          as: "statusatletum", // Alias correto para statusatleta
          attributes: ["designacao"],
        },
      ],
    });

    res.status(200).json({ success: true, data: atletas });
  } catch (error) {
    console.error("Erro ao listar atletas: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro ao listar atletas.", error });
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
