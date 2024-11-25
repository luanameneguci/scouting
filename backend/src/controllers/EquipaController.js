const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
var Equipa = require("../models/equipa");

sequelize.sync();

const controllers = {};

controllers.createEquipa = async (req,res) => {
 
  const { id_tipoequipa } = req.body;

  const data = await Equipa.create({
    id_tipoequipa: id_tipoequipa
  })
  .then(function(data){
  return data;
  })
  .catch(error =>{
  console.log("Erro: "+error)
  return error;
  })
  // return res
  res.status(200).json({
  success: true,
  message:"Equipa criada com sucesso!",
  data: data
  });
}

controllers.equipa_list = async (req, res) => {
  const { id_equipa} = req.params;
const data = await Equipa.findAll({
  where: { id_equipa: id_equipa }
})
.then(function(data){
return data;
})
.catch(error => {
return error;
});
res.json({success : true, data : data});
}

module.exports = controllers;