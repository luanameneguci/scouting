const express = require("express");
const sequelize = require("../models/database");

const { Sequelize, Op, literal, Model, DataTypes } = require('sequelize');
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const controllers = {};


controllers.DashInfo = async (req, res) => {
  const { id_tipoequipa } = req.params;

  try {
   
    const escaloes = await models.escalao.findAll(); // Fetch all escaloes
    

    const equipasPropriasData = await Promise.all(
      escaloes.map(async (escalao) => {
        try {
         
          const equipes = await models.equipa.findAll({
            where: { id_escalao: escalao.id_escalao, id_tipoequipa: id_tipoequipa }, // Filter for equipas próprias
            include: [
              {
                model: models.EquipaAtleta,
                as: "AtletasEquipa", // Include junction table
                include: [
                  {
                    model: models.atleta,
                    as: "RelatedEquipaAtleta", // Include athletes
                  },
                ],
              },
            ],
          });

          // Ensure that the `EquipaAtletas` property is populated
          const quantidadeAtletasEscalao = equipes.reduce((total, equipe) => {
           
           
            return total + equipe.AtletasEquipa.length;
          }, 0);

         
          return {
            escalao: escalao.designacao,
            quantidadeAtletasEscalao,
          };
        } catch (innerError) {
          console.error(
            `Error fetching equipes or counting athletes for escalao ${escalao.designacao}:`,
            innerError
          );
          throw innerError;
        }
      })
    );
    res.status(200).json(equipasPropriasData);
  } catch (error) {
    console.error("Error in DashInfo:", error);
    res
      .status(500)
      .json({ error: "An internal error occurred", details: error.message });
  
}
}


  /* try {
    console.log("Fetching escaloes...");
    const escaloes = await models.escalao.findAll(); // Fetch all escaloes
    console.log("Escaloes fetched:", escaloes);

    const equipasPropriasData = await Promise.all(
      escaloes.map(async (escalao) => {
        try {
          console.log(`Fetching equipes for escalao: ${escalao.designacao} (id: ${escalao.id_escalao})...`);
          const equipes = await models.equipa.findAll({
            where: { id_escalao: escalao.id_escalao, id_tipoequipa: id_tipoequipa }, // Filter for equipas próprias
            include: [
              {
                model: models.EquipaAtleta,
                as: "AtletasEquipa", // Include junction table
                include: [
                  {
                    model: models.atleta,
                    as: "RelatedEquipaAtleta", // Include athletes
                  },
                ],
              },
            ],
          });

          console.log(`Equipes fetched for escalao ${escalao.designacao}:`, equipes);

          // Ensure that the `EquipaAtletas` property is populated
          const quantidadeAtletasEscalao = equipes.reduce((total, equipe) => {
            if (!equipe.AtletasEquipa) {
              console.warn(`No AtletasEquipa found for equipe ${equipe.id}`);
              return total;
            }

            console.log(
              `Counting athletes for equipe ${equipe.id}, athletes found:`,
              equipe.AtletasEquipa.length
            );
            return total + equipe.AtletasEquipa.length;
          }, 0);

          console.log(
            `Total athletes for escalao ${escalao.designacao}:`,
            quantidadeAtletasEscalao
          );

          return {
            escalao: escalao.designacao,
            quantidadeAtletasEscalao,
          };
        } catch (innerError) {
          console.error(
            `Error fetching equipes or counting athletes for escalao ${escalao.designacao}:`,
            innerError
          );
          throw innerError;
        }
      })
    );

    console.log("Equipas próprias data:", equipasPropriasData);
    res.status(200).json(equipasPropriasData);
  } catch (error) {
    console.error("Error in DashInfo:", error);
    res
      .status(500)
      .json({ error: "An internal error occurred", details: error.message });
  } */

controllers.allEquipas = async (req, res) => {
  try {
    const equipas = await models.equipa.findAll({
      include: [
        { model: models.escalao },
        { model: models.divisao },
        { model: models.tipoequipa }
      ],
      order: [['id_escalao', 'DESC'],
      ['id_divisao', 'ASC']]


    });
    return res.status(200).json({ data: equipas });
  } catch (error) {
    console.error("Error ao procurar equipas:", error);
    return res.status(500).json({ error: "Erro no servidor", message: error.message });
  }
};

controllers.getEscalaoTipo = async (req, res) => {
  try {
    const escaloes = await models.escalao.findAll({
      order: [['id_escalao', 'DESC']]
    });

    const tipos = await models.tipoequipa.findAll({
      order: [['id_tipoequipa', 'DESC']]
    });

    return res.status(200).json({
      escaloes,
      tipos
    });
  } catch (error) {
    console.error("Erro ao tentar receber escalões e tipos:", error);
    return res.status(500).json({ error: "Erro no servidor", message: error.message });
  }
};

controllers.createEquipa = async (req, res) => {
  const data = req.body;

  try {
    const existingEquipas = await models.equipa.findAll({
      where: {
        id_escalao: data.escalao,
        id_tipoequipa: data.tipo
      },
      order: [['id_divisao', 'DESC']]
    });

    let divisao = 1;

    if (existingEquipas.length > 0) { // Se houver equipas
      // Adiciona um à divisão da última equipa
      divisao = existingEquipas[0].id_divisao + 1;
      // Se a divisão ficar maior que 3, retorna erro
      if (divisao > 3) {
        return res.status(400).json({ error: "Atingiu o máximo de divisões para o tipo e escalão!" });
      }
    }
    const newEquipa = await models.equipa.create({
      id_escalao: data.escalao,
      id_tipoequipa: data.tipo,
      id_divisao: divisao
    });

    return res.status(200).json(newEquipa);
  }
  catch (error) {
    console.error("Erro ao criar equipa:", error);
    return res.status(500).json({ error: "Erro no servidor", message: error.message });

  }
}

controllers.deleteEquipa = async (req, res) => {
  const id = req.params.id;
  try {
    // Find the equipa being deleted
    const equipaRemover = await models.equipa.findOne({ where: { id_equipa: id } });

    if (!equipaRemover) {
      return res.status(404).json({ error: "Equipa não encontrada" });
    }

    const { id_tipoequipa, id_escalao, id_divisao } = equipaRemover;

    // Se não for da 3 divisao (C), edita as outras equipas uma divisao acima
    if (id_divisao !== 3) {
      await models.equipa.update(
        { id_divisao: literal('id_divisao - 1') },
        {
          where: {
            id_tipoequipa,
            id_escalao,
            id_divisao: {
              [Op.gt]: id_divisao
            }
          }
        }
      );
    }

    await models.EquipaAtleta.destroy({ where: { id_equipa: id } });
    await models.equipa.destroy({ where: { id_equipa: id } });

    return res.status(200).json({ message: "Equipa eliminada com sucesso!" });
  } catch (e) {
    {
      console.error("Erro ao eliminar equipa:", e);
      return res.status(500).json({ error: "Erro no servidor", message: e.message });
    }
  }
}
/*
// Criar a equipa -- Falta escalão
controllers.createEquipa = async (req, res) => {

  const { id_tipoequipa, id_escalao, id_divisao } = req.body;

  try {
    // Check if there is already an equipa with the same id_escalao and id_divisao
    const existingEquipa = await Equipa.findOne({
      where: {
        id_escalao: id_escalao,
        id_divisao: id_divisao
      }
    });

    if (existingEquipa) {
      return res.status(400).json({
        success: false,
        message: "Equipa com o mesmo escalão já existe."
      });
    }

    // Create the new equipa
    const newEquipa = await Equipa.create({
      id_tipoequipa: id_tipoequipa,
      id_escalao: id_escalao,
      id_divisao: id_divisao
    });

    res.status(200).json({
      success: true,
      message: "Equipa criada com sucesso!",
      data: newEquipa
    });
  } catch (error) {
    console.log("Erro: " + error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor",
      error: error.message
    });
  }
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
      where: {
        id_equipa: idEquipa,
        include: [{
          model: atleta,
          as: 'atleta',
          where: {
            id_statusatleta: {
              [Op.or]: [null, 1]
            }
          }
        }]
      }
    });
    res.status(200).json({ success: true, data: { equipa, atletas } }); // Responde a equipa e os atletas
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro no servidor", error: error.message });
  }
}


// Escalões de cada tipo de equipa (própria ou sombra)
controllers.escaloes_equipa = async (req, res) => {
  const { tipoEquipa } = req.params;

  try {
    // Encontra todas as equipas do respetivo tipo (com o escalao e divisao)
    const equipas = await Equipa.findAll({
      where: { id_tipoequipa: tipoEquipa },
      include: [
        {
          model: escalao,
        },
        {
          model: divisao,
        }
      ]
    });

    // Extrai os escaloes e divisoes de cada equipa
    const escaloesDivisoes = equipas.map(e => ({
      escalao: e.escalao,
      divisao: e.divisao
    }));

    res.status(200).json({ success: true, data: escaloesDivisoes });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro no servidor", error: error.message });
  }
}

controllers.alterar_posicao_atleta = async (req, res) => {
  const { idEquipa, idAtleta, novaPosicao } = req.params;

  if (novaPosicao < 0 || novaPosicao > 17) { // Verifica se a posição é válida
    return res.status(400).json({ success: false, message: "Posição inválida" });
  }

  try {
    const equipaAtleta = await EquipaAtleta.findOne({ // Busca o atleta na equipa
      where: { id_equipa: idEquipa, id_atleta: idAtleta }
    });

    if (!equipaAtleta) { // Verifica se o atleta está na equipa
      return res.status(404).json({ success: false, message: "Atleta não encontrado na equipa" });
    }

    if (novaPosicao === 0) { // Verifica se é para remover
      await equipaAtleta.destroy();
      return res.status(200).json({ success: true, message: "Atleta removido da equipa" });
    }

    const existingAtleta = await EquipaAtleta.findOne({ // Se existir, e não for para remover, procura se já existe atleta naquela posicao...
      where: { id_equipa: idEquipa, posicaoformacao: novaPosicao }
    });

    if (existingAtleta) { // ... e responde
      return res.status(400).json({ success: false, message: "Posição já ocupada por outro atleta" });
    }

    equipaAtleta.posicaoformacao = novaPosicao; // Finalmente, se tudo acima for aceite, edita a posição e guarda na base de dados
    await equipaAtleta.save();

    res.status(200).json({ success: true, message: "Posição do atleta atualizada" });

  } catch (error) { // Se ocorrer algum erro, envia mensagem de erro
    return res.status(500).json({ success: false, message: "Erro no servidor", error: error.message });
  }
}
*/
/*
Precisa de:
 - X -  GET /:tipoEquipa/escaloes - Todos os escalões das equipas (prop e sombra dep)
    - Params: tipo de equipa
    - Res: lista de escalões
 - X - GET /:idEquipa - Informação da equipa + atletas
    - Params: idEquipa
    - Res: info da equipa + atletas
 - X - PUT/PATCH /:idAtleta- Editar atletas da equipa (add/remove, mudar posição)
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