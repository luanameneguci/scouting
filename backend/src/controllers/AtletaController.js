const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const controllers = {};

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

  const data = await models.atleta.create({
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

  const data = await models.atleta.update(
    {
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
    },
    {
      where: { id_atleta: id_atleta },
    }
  )
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

controllers.listar = async (req, res) => {
  const data = await models.atleta.findAll({
    include: [
      {
        model: clube,
        as: "clube",
        attributes: ["nome"], // Replace 'nome' with the actual column name for the club's name
      },
      {
        model: escalao,
        as: "escalao",
        attributes: ["designacao"], // Replace 'nome' with the actual column name for the escalao's name
      },
      {
        model: statusatleta,
        as: "statusAtleta",
        attributes: ["designacao"], // Replace 'nome' with the actual column name for the statusAtleta's name
      },
    ],
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.listarByPk = async (req, res) => {
  const data = await models.atleta.findByPK({})
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.apagar = async (req, res) => {
  // parâmetros por post
  const { id_atleta } = req.body;
  // delete por sequelize
  const del = await models.atleta.destroy({
    where: { id_atela: id_atleta },
  });
  res.json({ success: true, deleted: del });
};

module.exports = controllers;
