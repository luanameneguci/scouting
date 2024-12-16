const { Op } = require('sequelize');
const sequelize = require("../models/database");
const initModels = require('../models/init-models');
const models = initModels(sequelize);

const controllers = {};

controllers.InsertsIniciais = async (req, res) => {
    try {
        // Ensure the database is synced
        await models.sequelize.sync();

        const transaction = await sequelize.transaction();
        try {
            // Check if data already exists
            const tipoUtilizadorCount = await models.tipoutilizador.count();
            if (tipoUtilizadorCount === 0) {
                // Insert tipos de utilizadores
                await models.tipoutilizador.bulkCreate([
                    { designacao: 'Scout' },
                    { designacao: 'Admin' },
                    { designacao: 'Convidado' }
                ], { transaction });
            } else {
                throw new Error("TipoUtilizador data already exists");
            }

            const escalaoCount = await models.escalao.count();
            if (escalaoCount === 0) {
                // Insert escaloes
                await models.escalao.bulkCreate([
                    { designacao: 'SUB-4' },
                    { designacao: 'SUB-5' },
                    { designacao: 'SUB-6' },
                    { designacao: 'SUB-7' },
                    { designacao: 'SUB-8' },
                    { designacao: 'SUB-9' },
                    { designacao: 'SUB-10' },
                    { designacao: 'SUB-11' },
                    { designacao: 'SUB-12' },
                    { designacao: 'SUB-13' },
                    { designacao: 'SUB-14' },
                    { designacao: 'SUB-15' },
                    { designacao: 'SUB-16' },
                    { designacao: 'SUB-17' },
                    { designacao: 'SUB-18' },
                    { designacao: 'SUB-19' },
                    { designacao: 'SUB-20' },
                    { designacao: 'SUB-21' },
                    { designacao: 'SUB-23' },
                    { designacao: 'Séniores' }
                ], { transaction });
            } else {
                throw new Error("Escalao data already exists");
            }

            const divisaoCount = await models.divisao.count();
            if (divisaoCount === 0) {
                // Insert divisao
                await models.divisao.bulkCreate([
                    { designacao: 'A' },
                    { designacao: 'B' },
                    { designacao: 'C' }
                ], { transaction });
            } else {
                throw new Error("Divisao data already exists");
            }

            const funcaoCount = await models.funcao.count();
            if (funcaoCount === 0) {
                // Insert funcoes
                await models.funcao.bulkCreate([
                    { designacao: 'ATA' },
                    { designacao: 'MED' },
                    { designacao: 'DEF' },
                    { designacao: 'GR' }
                ], { transaction });
            } else {
                throw new Error("Funcao data already exists");
            }

            const tipoEquipaCount = await models.tipoequipa.count();
            if (tipoEquipaCount === 0) {
                // Insert tipo de equipa
                await models.tipoequipa.bulkCreate([
                    { designacao: 'Sombra' },
                    { designacao: 'Própria' }
                ], { transaction });
            } else {
                throw new Error("TipoEquipa data already exists");
            }

            const statusAtletaCount = await models.statusatleta.count();
            if (statusAtletaCount === 0) {
                // Insert status atleta
                await models.statusatleta.bulkCreate([
                    { designacao: 'Ativo' },
                    { designacao: 'Escondido' },
                    { designacao: 'Inválido' }
                ], { transaction });
            } else {
                throw new Error("StatusAtleta data already exists");
            }

            await transaction.commit();
            res.status(200).send({ message: "Initial Inserts completed successfully" });
        } catch (error) {
            await transaction.rollback();
            res.status(500).send({ message: "Error during initial inserts", error });
        }

        // Separate transaction for inserting positions
        const posicaoTransaction = await sequelize.transaction();
        try {
            const posicaoCount = await models.posicao.count();
            if (posicaoCount === 0) {
                // Insert posicoes
                const funcoes = await models.funcao.findAll();
                const funcaoMap = {};
                funcoes.forEach(funcao => {
                    funcaoMap[funcao.designacao] = funcao.id_funcao;
                });

                await models.posicao.bulkCreate([
                    { id_funcao: funcaoMap['GR'], designacao: 'GR' },
                    { id_funcao: funcaoMap['DEF'], designacao: 'DD' },
                    { id_funcao: funcaoMap['DEF'], designacao: 'DE' },
                    { id_funcao: funcaoMap['DEF'], designacao: 'DC' },
                    { id_funcao: funcaoMap['DEF'], designacao: 'LD' },
                    { id_funcao: funcaoMap['DEF'], designacao: 'LE' },
                    { id_funcao: funcaoMap['MED'], designacao: 'MD' },
                    { id_funcao: funcaoMap['MED'], designacao: 'ME' },
                    { id_funcao: funcaoMap['MED'], designacao: 'MC' },
                    { id_funcao: funcaoMap['MED'], designacao: 'MCD' },
                    { id_funcao: funcaoMap['MED'], designacao: 'MCO' },
                    { id_funcao: funcaoMap['MED'], designacao: 'MEO' },
                    { id_funcao: funcaoMap['MED'], designacao: 'MDO' },
                    { id_funcao: funcaoMap['ATA'], designacao: 'ED' },
                    { id_funcao: funcaoMap['ATA'], designacao: 'EE' },
                    { designacao: 'SA', id_funcao: funcaoMap['ATA'] },
                    { designacao: 'PL', id_funcao: funcaoMap['ATA'] }
                ], { posicaoTransaction });
            } else {
                throw new Error("Posicao data already exists");
            }

            await posicaoTransaction.commit();
        } catch (error) {
            await posicaoTransaction.rollback();
            res.status(500).send({ message: "Error during position inserts", error });
        }
    } catch (error) {
        res.status(500).send({ message: "Error syncing database", error });
    }
}

/*
tipos de utilizadores
- Scout
- Admin
- Convidado

escalões
- SUB-4
- SUB-5
- SUB-6
- SUB-7
- SUB-8
- SUB-9
- SUB-10
- SUB-11
- SUB-12
- SUB-13
- SUB-14
- SUB-15
- SUB-16
- SUB-17
- SUB-18
- SUB-19
- SUB-20
- SUB-21
- SUB-23
- Séniores

divisão
- A
- B
- C

posições
- GR (gr)
- DD (def)
- DE (def)
- DC (def)
- LD (def)
- LE (def)
- MD (med)
- ME (med)
- MC (med)
- MCD (med)
- MCO (med)
- MEO (med)
- MDO (med)
- ED (ata)
- EE (ata)
- SA (ata)
- PL (ata)

funções
- ATA
- MED
- DEF
- GR

tipo de equipa
- Sombra
- Própria

status atleta
- Ativo
- Escondido
- Inválido


-- e alguns atletas utilizadores e equipas para testar mais facilmente*/
module.exports = controllers;