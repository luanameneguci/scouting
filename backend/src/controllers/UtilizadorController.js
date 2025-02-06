const express = require("express");
const sequelize = require("../models/database"); // Importa a instância do Sequelize
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const initModels = require("../models/init-models"); // Inicializa os modelos
const models = initModels(sequelize); // Vincula os modelos ao Sequelize
const bcrypt = require("bcryptjs");

const UtilizadorController = {
  async listar(req, res) {
    try {
      console.log("🔹 Chamando listar()..."); // Debug

      const utilizadores = await models.utilizador.findAll({
        include: {
          model: models.tipoutilizador,
          as: 'tipoutilizador',
          attributes: ['designacao'],
        },
      });

      console.log("✅ Utilizadores carregados:", utilizadores.length);
      return res.status(200).json(utilizadores);
    } catch (error) {
      console.error("❌ Erro ao listar utilizadores:", error.message, error.stack);
      return res.status(500).json({ error: 'Erro ao listar utilizadores', details: error.message });
    }
  },

  async criar(req, res) {
    try {
        const { id_tipoutilizador, nome, email, password, telefone } = req.body;

        // 🔹 Verifica se todos os campos obrigatórios estão preenchidos
        if (!id_tipoutilizador || !nome || !email || !password || !telefone) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
        }

        // 🔹 Verifica se o email já existe
        const emailExistente = await models.utilizador.findOne({ where: { email } });
        if (emailExistente) {
            return res.status(400).json({ error: "Email já está registado!" });
        }

        // 🔹 Hashear a password antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 Criar o novo utilizador
        const novoUtilizador = await models.utilizador.create({
            id_tipoutilizador,
            nome,
            email,
            password: hashedPassword,
            telefone,
        });

        return res.status(201).json({ message: "Utilizador criado com sucesso!", utilizador: novoUtilizador });
    } catch (error) {
        console.error("Erro ao criar utilizador:", error);
        return res.status(500).json({ error: 'Erro ao criar utilizador', details: error.message });
    }
},

  async atualizar(req, res) {
    const { id } = req.params;
    const { id_tipoutilizador, nome, email, password, telefone } = req.body;

    try {
      const utilizadorExistente = await models.utilizador.findByPk(id);

      if (!utilizadorExistente) {
        return res.status(404).json({ error: 'Utilizador não encontrado' });
      }

      await models.utilizador.update(
        { id_tipoutilizador, nome, email, password, telefone },
        { where: { id_utilizador: id } }
      );

      return res.status(200).json({ message: 'Utilizador atualizado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar utilizador' });
    }
  },

  async remover(req, res) {
    const { id } = req.params;

    try {
      const utilizadorExistente = await models.utilizador.findByPk(id);

      if (!utilizadorExistente) {
        return res.status(404).json({ error: 'Utilizador não encontrado' });
      }

      await models.utilizador.destroy({ where: { id_utilizador: id } });

      return res.status(200).json({ message: 'Utilizador removido com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover utilizador' });
    }
  },

  async associarJogo(req, res) {
    const { id_utilizador, id_jogo } = req.body;

    try {
      const jogoAssociado = await models.UtilizadorJogo.create({
        id_utilizador,
        id_jogo,
      });

      return res.status(201).json(jogoAssociado);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao associar utilizador a um jogo' });
    }
  },

  async associarJogoExistente(req, res) {
    const { id_jogo } = req.params;
    const { id_utilizador } = req.body;
  
    try {
      const jogoAssociado = await models.UtilizadorJogo.create({
        id_utilizador,
        id_jogo,
      });
  
      return res.status(201).json({
        success: true,
        message: "Treinador associado ao jogo com sucesso",
        data: jogoAssociado,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: "Erro ao associar utilizador a um jogo",
      });
    }
  },
  
  async listarTreinadores(req, res) {
    try {
      const treinadores = await models.utilizador.findAll({
        include: {
          model: models.tipoutilizador,
          attributes: ['designacao'],
          where: {
            designacao: 'Scout',
          }
        },
      });

      return res.status(200).json({ treinadores });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar treinadores' });
    }
  },
};

module.exports = UtilizadorController;
