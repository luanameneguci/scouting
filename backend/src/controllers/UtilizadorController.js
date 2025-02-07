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

  // Função para registar um novo utilizador
  async criar(req, res) {
    try {
      const { nome, email, password, telefone, id_tipoutilizador } = req.body;

      // Validar campos obrigatórios
      if (!nome || !email || !password || !telefone) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      // Verificar se o utilizador já existe
      const existingUser = await models.utilizador.findOne({ where: { email } });
      if (existingUser) {
        console.log("Erro: Email já registrado");
        return res.status(400).json({ message: "Email já registado." });
      }

      // Encriptar a palavra-passe
      const hashedPassword = await bcrypt.hash(password, 10);

      const tipoUtilizador = id_tipoutilizador ? id_tipoutilizador : 1; // Se não for fornecido, assume o tipo 1 (scout)


      // Criar novo utilizador
      const newUser = await models.utilizador.create({
        nome,
        email,
        password: hashedPassword,
        telefone,
        id_tipoutilizador: tipoUtilizador,
      });


      return res.status(200).json({
        message: "Registo realizado com sucesso."
      });

    } catch (error) {
      console.error("Erro no servidor durante o registo:", error.message, error.stack);
      return res.status(500).json({ message: "Erro no servidor.", error: error.message });
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
  
      const updatedData = {
        id_tipoutilizador,
        nome,
        email,
        telefone,
      };
  
      // Só encripta e atualiza a senha se uma nova for fornecida
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }
  
      await models.utilizador.update(updatedData, { where: { id_utilizador: id } });
  
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

       // 🛑 Apagar todas as dependências antes de remover o utilizador
    await models.relatorio.destroy({ where: { id_utilizador: id } }); // Remove relatórios
    await models.UtilizadorJogo.destroy({ where: { id_utilizador: id } }); // Remove jogos associados
    await models.notificacoes.destroy({ where: { id_utilizador: id } }); // Remove relatórios
    await models.utilizador.destroy({ where: { id_utilizador: id } }); // Remove jogos associados

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
  async getUtilizador(req, res) {
    const { id } = req.params;
  
    try {
      // Buscar utilizador pelo ID
      const utilizador = await models.utilizador.findByPk(id, {
        include: {
          model: models.tipoutilizador,
          as: "tipoutilizador",
          attributes: ["designacao"],
        },
      });
  
      // Se não encontrar, retorna erro 404
      if (!utilizador) {
        return res.status(404).json({ error: "Utilizador não encontrado." });
      }
  
      // Retorna os dados do utilizador
      return res.status(200).json(utilizador);
    } catch (error) {
      console.error("Erro ao buscar utilizador:", error.message);
      return res.status(500).json({ error: "Erro ao buscar utilizador." });
    }
  }  
};

module.exports = UtilizadorController;
