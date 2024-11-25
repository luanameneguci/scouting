const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var TipoEquipa = require("../models/tipoequipa")(sequelize, DataTypes);


const controllers = {};

controllers.tipoEquipa_list = async (req, res) => {
  const data = await TipoEquipa.findAll({});
  res.json(data);
};



module.exports = controllers; 