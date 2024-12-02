const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
var Equipa = require("../models/equipa");
var EquipaAtleta = require("../models/EquipaAtleta");
var atleta = require("../models/atleta");
var escalao = require("../models/escalao");
var EscalaoDivisao = require("../models/EscalaoDivisao");
var divisao = require("../models/divisao");

sequelize.sync();

const controllers = {};

// Criar a equipa -- Falta escalão
controllers.createEquipa = async (req, res) => {

  const { id_tipoequipa } = req.body;

  const data = await Equipa.create({
    id_tipoequipa: id_tipoequipa
  })
    .then(function (data) {
      return data;
    })
    .catch(error => {
      console.log("Erro: " + error)
      return error;
    })
  // return res
  res.status(200).json({
    success: true,
    message: "Equipa criada com sucesso!",
    data: data
  });
}

// Get uma equipa e atletas. por idEquipa
// -- o status jogador é se ele tá ativo ou não?
controllers.single_equipa = async (req, res) => {
  const { idEquipa } = req.params;

  try {
    const equipa = await Equipa.findOne({
      where: { id_equipa: idEquipa }
    });

    if (!equipa) { // Se não encontrar a equipa
      return res.status(404).json({ success: false, message: "Equipa não encontrada" });
    }

    const atletas = await EquipaAtleta.findAll({ // Atletas da equipa
      where: { id_equipa: idEquipa },
      include: [{ // falta verificar o estado do atleta
        model: atleta,
        as: 'atleta'
      }]
    });

    res.status(200).json({ success: true, data: { equipa, atletas } }); // Responde a equipa e os atletas
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro no servidor", error: error.message });
  }
}


// Escalões de cada equipa (própria ou sombra)
// -- falta esta ligacao na bd
controllers.escaloes_equipa = async (req, res) => {
  const { tipoEquipa } = req.params;

}

controllers.alterar_posicao_atleta = async (req, res) => {
  const { idEquipa, idAtleta, novaPosicao } = req.params;

  if (novaPosicao < 0 || novaPosicao > 17) { // Verifica se a posição é válida
    return res.status(400).json({ success: false, message: "Posição inválida" });
  }

  try {
    const equipaAtleta = await EquipaAtleta.findOne({
      where: { id_equipa: idEquipa, id_atleta: idAtleta }
    });

    if (!equipaAtleta) { // Verifica se o atleta está na equipa
      return res.status(404).json({ success: false, message: "Atleta não encontrado na equipa" });
    }

    if (novaPosicao === 0) { // Verifica se é para remover
      await equipaAtleta.destroy();
      return res.status(200).json({ success: true, message: "Atleta removido da equipa" });
    }

    const existingAtleta = await EquipaAtleta.findOne({ // Se existir, e não for para remover... 
      where: { id_equipa: idEquipa, posicaoformacao: novaPosicao }
    });

    if (existingAtleta) { // ... verifica se a posição já está ocupada
      return res.status(400).json({ success: false, message: "Posição já ocupada por outro atleta" });
    }

    equipaAtleta.posicaoformacao = novaPosicao; // Finalmente, se tudo acima for aceite, edita a posição e guarda na base de dados
    await equipaAtleta.save();

    res.status(200).json({ success: true, message: "Posição do atleta atualizada" });

  } catch (error) { // Se ocorrer algum erro, envia mensagem de erro
    return res.status(500).json({ success: false, message: "Erro no servidor", error: error.message });
  }
}

/*
Precisa de:
 - GET /:tipoEquipa/escaloes - Todos os escalões das equipas (prop e sombra dep)
    - Params: tipo de equipa
    - Res: lista de escalões
 - X - GET /:idEquipa - Informação da equipa + atletas
    - Params: idEquipa
    - Res: info da equipa + atletas
 - PUT/PATCH /:idAtleta- Editar atletas da equipa (add/remove, mudar posição)
    - Params: idAtleta, atleta
    - Res: atleta?
---> não sei se isto é melhor nos atletas mas //
 - GET - Receber todos os atletas
    - Res: atletas
 - GET - Filtrar os atletas
    - Params: filtros
    - Res: atletas
*/

module.exports = controllers;