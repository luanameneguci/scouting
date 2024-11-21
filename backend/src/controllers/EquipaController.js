const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var initModels = require("../models/init-models");
var models = initModels(sequelize);


sequelize.sync();

const controllers = {};

controllers.equipa_list = async (req, res) => {
  const data = await models.equipa.findAll({});
  res.json(data);
};

/* controllers.equipa_create = async (req, res) => {
  const { adminDepartmentDescript } = req.body;
  const adminDepartment = await AdminDepartment.create({
    adminDepartmentDescript   
  });
  res.json(adminDepartment);
};

controllers.admin_department_update = async (req, res) => {
  let idReceived = req.params.id;
  const { adminDepartmentDescript } = req.body;
  const adminDepartment = await AdminDepartment.update(
    { adminDepartmentDescript },
    { where: { idDepartment: idReceived } }
  );

  res.json({ adminDepartment });
};

controllers.admin_department_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await AdminDepartment.findOne({ where: { idDepartment: idReceived } });
  res.json(data);
};

controllers.admin_department_delete = async (req, res) => {
  let idReceived = req.params.id;
  await AdminDepartment.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
}; */

module.exports = controllers;