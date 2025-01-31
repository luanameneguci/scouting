const express = require("express");
const sequelize = require("../models/database");

const { Sequelize, Op, literal, Model, DataTypes, where } = require('sequelize');
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const controllers = {};


controllers.DashInfo = async (req, res) => {
  const { id_tipoequipa } = req.params;

  try {

    const escaloes = await models.escalao.findAll(); // Fetch all escaloes


    const data = await Promise.all(
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
    res.status(200).json({ success: true, data });
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

controllers.getEquipa = async (req, res) => {
  const id = req.params.id;
  try {
    const equipa = await models.equipa.findOne({
      where: { id_equipa: id },
      include: [
        { model: models.escalao },
        { model: models.divisao },
        { model: models.tipoequipa }
      ]
    });
    if (!equipa) {
      return res.status(404).json({ error: "Equipa não encontrada" });
    }
    return res.status(200).json({ equipa });
  } catch (error) {
    console.error("Erro ao procurar equipa:", error);
    return res.status(500).json({ error: "Erro no servidor", message: error.message });
  }
}
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
    return res.status(200).json({ equipas });
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
    const equipaFull = await models.equipa.findOne({
      where: { id_equipa: newEquipa.id_equipa },
      include: [
        {model: models.escalao},
        {model: models.divisao},
        {model: models.tipoequipa}
      ]}
      );
    return res.status(200).json({message: "Equipa Criada", equipa: equipaFull});
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
    console.error("Erro ao eliminar equipa:", e);
    return res.status(500).json({ error: "Erro no servidor", message: e.message });
  }
}

controllers.atletasEquipa = async (req, res) => {
  const idEquipa = req.params.id;
  try {

    const atletas = await models.EquipaAtleta.findAll({
      where: { id_equipa: idEquipa },
      include: {
        model: models.atleta,
        as: 'RelatedEquipaAtleta'
      },
      order: [['posicaoformacao', 'ASC']]
    })
    res.status(200).json({ atletas });
  }
  catch (error) {
    console.error("Erro ao procurar atletas da equipa:", error);
    return res.status(500).json({ error: "Erro no servidor", message: error.message });
  }
}

controllers.removeAtletaEquipa = async (req, res) => {
  const { idEquipa, idAtleta } = req.params;
  try {
    const atletaEquipa = await models.EquipaAtleta.findOne({
      where: { id_equipa: idEquipa, id_atleta: idAtleta }
    });

    if (!atletaEquipa) {
      return res.status(404).json({ error: "Atleta não encontrado na equipa" });
    }

    await atletaEquipa.destroy();

    return res.status(200).json({ message: "Atleta removido com sucesso!" });
  }
  catch (error) {
    console.error("Erro ao remover atleta da equipa:", error);
    return res.status(500).json({ error: "Erro no servidor", message: error.message });
  }
}

controllers.trocaPosicao = async (req, res) => {
  const { idEquipa, idAtleta, novaPosicao } = req.params;
  try {

    const atletaSelecionado = await models.EquipaAtleta.findOne({
      where: { id_equipa: idEquipa, id_atleta: idAtleta }
    });

    // Se o atleta estiver na equipa (Editar)
    if (atletaSelecionado) { // Editar

      // Se a nova posição for a mesma, não faz nada
      if (novaPosicao == atletaSelecionado.posicaoformacao) {
        return res.status(400).json({ error: "Atleta já está nessa posição" });
      }

      // Verifica se está alguem na nova posição
      const atletaExistente = await models.EquipaAtleta.findOne({
        where: { id_equipa: idEquipa, posicaoformacao: novaPosicao }
      });

      // Se estiver alguem e o atleta já estiver na equipa atribui a posição do atleta atual
      if (atletaExistente) {
        atletaExistente.posicaoformacao = atletaSelecionado.posicaoformacao;
        await atletaExistente.save();
      }

      // Atualiza a posição do atleta selecionado
      atletaSelecionado.posicaoformacao = novaPosicao;
      await atletaSelecionado.save();

      return res.status(200).json({ message: "Posições trocadas com sucesso!" });
    } else { // Adicionar

      // Verifica se está alguem na nova posição
      const atletaExistente = await models.EquipaAtleta.findOne({
        where: { id_equipa: idEquipa, posicaoformacao: novaPosicao }
      });

      // Se estiver remove
      if (atletaExistente) {
        await atletaExistente.destroy();
      }

      // e adiciona o atleta na posicao
      await models.EquipaAtleta.create({
        id_equipa: idEquipa,
        id_atleta: idAtleta,
        posicaoformacao: novaPosicao
      });


      return res.status(200).json({ message: "Atleta adicionado com sucesso!" });
    }
  } catch (error) {
    console.error("Erro ao trocar posição do atleta:", error);
    return res.status(500).json({ error: "Erro no servidor", message: error.message });
  }
};

module.exports = controllers;