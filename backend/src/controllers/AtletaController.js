const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes, fn, col } = require("sequelize");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

// MODELOS PRINCIPAIS
const Atleta = models.atleta;
const Clube = models.clube;
const Nacionalidade = models.nacionalidade;

// TABELAS PIVÔS/RELACIONADAS A ID_ATLETA
const EquipaAtleta = models.EquipaAtleta;
const JogoAtleta = models.JogoAtleta;
const PosicaoAtleta = models.PosicaoAtleta;
const NacionalidadeAtleta = models.nacionalidadeatleta;
const UtilizadorJogo = models.UtilizadorJogo;
const Relatorio = models.relatorio;

// (Opcionalmente, se quiser importar todas as pivot/tabelas, mesmo que não use para deletar:)
const EscalaoDivisao = models.EscalaoDivisao;
const JogoClube = models.JogoClube;

// CONTROLLERS
const controllers = {};

// Criar um novo atleta e associar nacionalidades corretamente
controllers.criar = async (req, res) => {
  try {
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
      nacionalidades, // Array de IDs de nacionalidade
    } = req.body;

    // Criar o atleta primeiro
    const novoAtleta = await Atleta.create({
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
    });

    // Se houver nacionalidades, associar ao atleta na tabela nacionalidadeatleta
    if (nacionalidades && nacionalidades.length > 0) {
      const nacionalidadesEncontradas = await Nacionalidade.findAll({
        where: { id_nacionalidade: nacionalidades }, // Busca pelas IDs enviadas
      });

      if (nacionalidadesEncontradas.length > 0) {
        await novoAtleta.addNacionalidades(nacionalidadesEncontradas); // Associação Many-to-Many
      }
    }

    // Buscar o atleta com as nacionalidades associadas
    const atletaCriado = await Atleta.findByPk(novoAtleta.id_atleta, {
      include: {
        model: Nacionalidade,
        as: "nacionalidades", // Deve ser igual ao alias definido no `initModels.js`
        attributes: ["id_nacionalidade", "designacao"],
        through: { attributes: [] }, // Remove colunas extras da tabela intermediária
      },
    });

    res.status(201).json({
      success: true,
      message: "Atleta criado com sucesso!",
      data: atletaCriado, // Retornamos o atleta já com nacionalidades associadas
    });
  } catch (error) {
    console.error("Erro ao criar atleta:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao criar atleta",
      error: error.message,
    });
  }
};


// Editar atleta corrigido
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

  const data = await Atleta.update(
    {
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
    },
    {
      where: { id_atleta },
    }
  )
    .then(() => Atleta.findByPk(id_atleta)) // Retornar o atleta atualizado
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });
  res.status(200).json({
    success: true,
    data: data,
  });
};

controllers.averageRating = async (req, res) => {
  try {
    const averageRating = await models.atleta.findOne({
      attributes: [[fn("AVG", col("ratinggeral")), "average_ratinggeral"]],
    });

    const avgRating = parseFloat(averageRating.dataValues.average_ratinggeral);

    res.json({
      success: true,
      data: avgRating,
    });
  }
  catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Erro.", err });
  }
};

// ---------------------------------------------------------------------
// 4) LISTAR ATLETAS (com paginação) - CORRIGIDO para incluir POSIÇÕES
// ---------------------------------------------------------------------
controllers.listar = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const limit = parseInt(size);
    const offset = (page - 1) * limit;

    const atletas = await models.atleta.findAndCountAll({
      limit,
      offset,
      attributes: [
        "id_atleta",
        "nome",
        "datanascimento",
        "ratingfinal",
        "ratinggeral",
      ],
      include: [
        {
          model: models.clube,
          as: "clube",
          attributes: ["nome"],
        },
        {
          model: models.escalao,
          as: "escalao",
          attributes: ["designacao"],
        },
        {
          model: models.statusatleta,
          as: "statusatletum",
          attributes: ["designacao"],
        },
        {
          model: models.nacionalidade,
          as: "nacionalidades",
          through: { attributes: [] },
          required: false,
        },
        // ---- INCLUIR POSIÇÕES AQUI ----
        {
          model: models.posicao,
          as: "posicoes",
          through: { attributes: [] }, // não exibe colunas extras da pivot
          required: false, // se quiser que atletas sem posição também apareçam
          include: [
            {
              model: models.funcao,
              required: false, // se quiser trazer a "função" associada
            },
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      data: atletas.rows,
      totalItems: atletas.count,
      totalPages: Math.ceil(atletas.count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Erro ao listar atletas: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro ao listar atletas.", error });
  }
};


controllers.filtrarAtletas = async (req, res) => {
  try {
    const { page = 1, size = 12 } = req.query;
    const limit = parseInt(size);
    const offset = (page - 1) * limit;
    const { filtros } = req.body;
    if (!filtros) {
      return res.status(400).json({ success: false, message: "Filtros não fornecidos." });
    }
    const whereLiteral = `
      1=1
      ${filtros.nome ? `AND "atleta"."nome" ILIKE '%${filtros.nome}%'` : ""}
      ${
        filtros.posicao
          ? `AND "atleta"."id_atleta" IN (
              SELECT pa."id_atleta"
              FROM "posicaoatleta" pa
              WHERE pa."id_posicao" = ${filtros.posicao}
            )`
          : ""
      }
      ${filtros.clube ? `AND "atleta"."id_clube" = ${filtros.clube}` : ""}
      ${
        filtros.ratingMin
          ? `AND floor("atleta"."ratingfinal") = ${filtros.ratingMin}`
          : ""
      }
      ${filtros.escalaoMin ? `AND "atleta"."id_escalao" >= ${filtros.escalaoMin}` : ""}
      ${filtros.escalaoMax ? `AND "atleta"."id_escalao" <= ${filtros.escalaoMax}` : ""}
      ${
        filtros.anoMin
          ? `AND EXTRACT(YEAR FROM "atleta"."datanascimento") >= ${filtros.anoMin}`
          : ""
      }
      ${
        filtros.anoMax
          ? `AND EXTRACT(YEAR FROM "atleta"."datanascimento") <= ${filtros.anoMax}`
          : ""
      }
    `;
    const { count, rows } = await models.atleta.findAndCountAll({
      where: Sequelize.literal(whereLiteral),
      include: [
        { model: models.escalao },
        { model: models.clube },
        {
          model: models.nacionalidade,
          as: "nacionalidades",
          through: { attributes: [] },
          required: false,
        },
        {
          model: models.posicao,
          as: "posicoes",
          through: { attributes: [] },
          include: { model: models.funcao, required: false },
          required: false,
        },
      ],
      order: [["ratingfinal", "DESC"]],
      limit,
      offset,
    });
    const totalPages = Math.ceil(count / limit);
    return res.status(200).json({
      success: true,
      atletas: rows,
      totalItems: count,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Erro ao filtrar atletas:", error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao filtrar atletas.", error });
  }
};

controllers.getTotalAthletes = async (req, res) => {
  try {
    const result = await sequelize.query("SELECT * FROM atleta", {
      type: sequelize.QueryTypes.SELECT, // To return raw data
    });

    const totalAthletes = result.length;
    res.json({ success: true, data: totalAthletes });
  }
  catch (err) {
    console.error("Error in getTotalAthletes:", err.message, err.stack);
    res.status(500).json({ success: false, message: "Database error" });
  }
}

controllers.getAgesData = async (req, res) => {
  try {
    const ageRanges = [
      { range: "0-13", min: 0, max: 13 },
      { range: "14-16", min: 14, max: 16 },
      { range: "17-19", min: 17, max: 19 },
      { range: "20-22", min: 20, max: 22 },
      { range: "23+", min: 23, max: Infinity },
    ];


    // Query the database to get athlete birthdays
    const result = await sequelize.query("SELECT datanascimento FROM atleta", {
      type: sequelize.QueryTypes.SELECT, // To return raw data
    });

    // Function to calculate age from birthday
    const calculateAge = (birthday) => {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    // Check if there are any results
    if (!result || result.length === 0) {
      console.error("No athlete data found in the database.");
      return res.status(404).json({ success: false, message: "No athlete data found." });
    }

    // Total number of athletes
    const totalAthletes = result.length;

    // Calculate age distribution
    const ageData = ageRanges.map((range) => {
      const count = result.filter((athlete) => {
        const age = calculateAge(athlete.datanascimento); // Use correct column name

        return age >= range.min && age <= range.max;
      }).length;

      const percentage = ((count / totalAthletes) * 100).toFixed(2); // Calculate percentage

      return { range: range.range, count, percentage };
    });

    // Respond with age distribution data
    res.json({ success: true, data: ageData });
  } catch (err) {
    console.error("Error in getAgesData:", err.message, err.stack);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

controllers.computeAverageRating = async () => {
  const atletas = await models.atleta.findAll({
    attributes: ['ratinggeral'],
  });

  if (atletas.length === 0) return 0;

  const totalRating = atletas.reduce((sum, atleta) => sum + atleta.ratinggeral, 0);
  return parseFloat((totalRating / atletas.length).toFixed(2));
};

controllers.getAverageRating = async (req, res) => {
  try {
    const data = await controllers.computeAverageRating();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao calcular a média dos ratings dos atletas",
      error: error.message,
    });
  }
}
;

controllers.getAboveAverage = async (req, res) => {
  try {
    const averageRating = await controllers.computeAverageRating();

    const atletas = await models.atleta.findAll({
          raw: true,
    });

    const aboveAverageAthletes = atletas.filter(atleta => atleta.ratinggeral > averageRating);

    res.status(200).json({
      success: true,
      averageRating: averageRating.toFixed(2),
      data: aboveAverageAthletes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao obter atletas com rating acima da média",
      error: error.message,
    });
  }
};


controllers.getRatingsData = async (req, res) => {
  try {
    // Fetch the total number of athletes
    const totalAthletes = await Atleta.count();

    // Initialize an array to store results
    const data = [];
    let rating;

    for (rating = 1; rating <= 5; rating++) {
      // Count the number of athletes for the current rating
      const count = await Atleta.count({
        where: {
          ratingfinal: rating
        }
      });

      // Calculate the percentage
      const percentage = totalAthletes > 0 ? ((count / totalAthletes) * 100).toFixed(2) : 0;

      // Add the result to the array
      data.push({
        count,
        percentage: parseFloat(percentage), // Parse percentage to a float
      });
    }

    // Return the results
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching ratings data.' });
  }
};

controllers.apagar = async (req, res) => {
  console.log("Dados recebidos no req.body:", req.body);
  const { id_atleta } = req.body;

  if (!id_atleta) {
    return res.status(400).json({
      success: false,
      message: "ID do atleta não fornecido.",
    });
  }

  try {
    // 1) Apagar relacionamentos nas tabelas que fazem referência direta ao atleta
    await EquipaAtleta.destroy({ where: { id_atleta } });
    await JogoAtleta.destroy({ where: { id_atleta } });
    await PosicaoAtleta.destroy({ where: { id_atleta } });
    await NacionalidadeAtleta.destroy({ where: { id_atleta } });
    await UtilizadorJogo.destroy({ where: { id_atleta } });
    await Relatorio.destroy({ where: { id_atleta } });

    // 2) Agora podemos apagar o atleta
    const deleted = await Atleta.destroy({
      where: { id_atleta },
    });

    if (deleted) {
      return res.json({
        success: true,
        message: "Atleta apagado com sucesso.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Atleta não encontrado.",
      });
    }
  } catch (error) {
    console.error("Erro ao apagar atleta:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao apagar atleta.",
    });
  }
};

// PAGINA DOS ATLETAS
controllers.buscarPorId = async (req, res) => {
  const { id_atleta } = req.params;

  try {
    const atleta = await Atleta.findOne({
      where: { id_atleta },
      attributes: [
        "id_atleta",
        "nome",
        "nomeencarregado",  // <-- ADICIONADO
        "contactoencarregado", // <-- ADICIONADO
        [
          Sequelize.fn(
            'TO_CHAR',
            Sequelize.col('datanascimento'),
            'DD/MM/YYYY'
          ),
          'datanascimento'
        ],
        "ratingfinal",
        "ratinggeral",
      ],
      include: [
        {
          model: models.clube,
          as: "clube",
          attributes: ["nome"],
        },
        {
          model: models.escalao,
          as: "escalao",
          attributes: ["designacao"],
        },
        {
          model: models.statusatleta,
          as: "statusatletum",
          attributes: ["designacao"],
        },
        {
          model: models.nacionalidade,
          as: 'nacionalidades',
          through: { attributes: [] }, 
          required: false
        },
      ],
    });

    if (!atleta) {
      return res.status(404).json({ message: "Atleta não encontrado" });
    }

    // Converter para objeto simples
    const atletaData = atleta.get({ plain: true });

    // Calcular idade
    const calculateAge = (birthday) => {
      if (!birthday) return null;
      const today = new Date();
      const [day, month, year] = birthday.split('/');
      const birthDate = new Date(`${year}-${month}-${day}`);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    atletaData.idade = calculateAge(atletaData.datanascimento);

    res.status(200).json(atletaData);
  } catch (error) {
    console.error("Erro ao buscar atleta:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};


controllers.atletasParaEquipa = async (req, res) => {
  const idEquipa = req.params.idEquipa;
  const filtros = req.body.filtros;
  const limit = 12;
  const offset = (req.body.page - 1) * limit;
  console.log(filtros)
  try {


    const equipa = await models.equipa.findOne({ where: { id_equipa: idEquipa } });

    if (!equipa) {
      return res.status(404).json({ success: false, message: "Equipa não encontrada." });
    }
    else {

      // Calculate total number of pages
      const { count, rows } = await models.atleta.findAndCountAll({
        where: Sequelize.literal(`
          "atleta"."id_statusatleta" = 1
          AND "atleta"."id_escalao" <= ${equipa.id_escalao}
          ${filtros.nome !== '' ? `AND "atleta"."nome" ILIKE '%${filtros.nome}%'` : ''}
          ${filtros.funcao !== 0 ? `AND "atleta"."id_atleta" IN (
            SELECT pa."id_atleta"
            FROM "posicaoatleta" pa
            JOIN "posicao" p ON pa."id_posicao" = p."id_posicao"
            WHERE p."id_funcao" = ${filtros.funcao} )` : ''}
          ${filtros.escalaoMax != 0 ? `AND "atleta"."id_escalao" <= ${filtros.escalaoMax}` : ''}
          ${filtros.escalaoMin != 0 ? `AND "atleta"."id_escalao" >= ${filtros.escalaoMin}` : ''}
          ${filtros.nacionalidade != 0 ? `AND "atleta"."id_atleta" IN (
            SELECT na."id_atleta"
            FROM "nacionalidadeatleta" na
            WHERE na."id_nacionalidade" = ${filtros.nacionalidade}
          )` : ''}
          ${filtros.ratingMin != 0 ? `AND "atleta"."ratingfinal" >= ${filtros.ratingMin}` : ''}
          ${filtros.ratingGeralMin != 0 ? `AND "atleta"."ratinggeral" >= ${filtros.ratingGeralMin}` : ''}
          ${filtros.anoMax != 0 ? `AND EXTRACT(YEAR FROM "atleta"."datanascimento") <= ${filtros.anoMax}` : ''}
          ${filtros.anoMin != 0 ? `AND EXTRACT(YEAR FROM "atleta"."datanascimento") >= ${filtros.anoMin}` : ''}
          ${filtros.clube != 0 ? `AND "atleta"."id_clube" <= ${filtros.clube}` : ''}

        `),
        include: [
          { model: models.escalao },
          { model: models.clube },
          {
            model: models.nacionalidade,
            as: 'nacionalidades',
            through: { attributes: [] },
            required: false

          },
          {
            model: models.posicao,
            as: 'posicoes', // use the same alias here
            through: { attributes: [] },
            include: { model: models.funcao, required: false },
            required: false
          }
        ],
        attributes: {
          include: [
            [
              Sequelize.literal(`(atleta.id_atleta IN (SELECT id_atleta FROM "equipaatleta" WHERE id_equipa = ${idEquipa}))`),
              'isInEquipa'
            ]
          ]
        },
        order: [[Sequelize.col('isInEquipa'), 'DESC'], ['ratingfinal', 'DESC']],
        limit: limit,
        offset: offset,
        group: ['atleta.id_atleta']


      });
      if (filtros.funcao !== 0) {
        rows
      }

      const totalPages = Math.ceil(count.length / limit);
      return res.status(200).json({
        success: true, atletas: rows, totalPages
      });
    }
  } catch (error) {
    console.error("Erro ao listar atletas por escalão:", error);
    res.status(500).json({ success: false, message: "Erro ao listar atletas por escalão.", error });
  }
}

controllers.listarNacionalidades = async (req, res) => {
  try {
    const nacionalidades = await Nacionalidade.findAll();
    return res.status(200).json({ success: true, data: nacionalidades });
  } catch (error) {
    console.error("Erro ao listar nacionalidades:", error);
    return res.status(500).json({ success: false, message: "Erro ao listar nacionalidades." });
  }
};


controllers.listarPosicoes = async (req, res) => {
  try {
    // Supondo que seu initModels tenha: var posicao = _posicao(...)
    const posicoes = await models.posicao.findAll();

    // Retorna no formato { success: true, data: [...] }
    return res.status(200).json({ success: true, data: posicoes });
  } catch (error) {
    console.error("Erro ao listar posicoes:", error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao listar posicoes." });
  }
};

controllers.allClubes = async (req, res) => {
  try {
    const clubes = await models.clube.findAll();
    res.status(200).json({ success: true, clubes });
  }
  catch (error) {
    console.error("Erro ao listar clubes:", error);
    res.status(500).json({ success: false, message: "Erro ao listar clubes.", error });
  }
}

module.exports = controllers;
