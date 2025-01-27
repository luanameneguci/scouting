const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
sequelize.sync({ alter: true });

// Ajustando Atleta para o modelo inicializado corretamente
var Atleta = models.atleta;
const clube = models.clube;
const escalao = models.escalao;
const statusatleta = models.statusatletum; // Corrigido o alias

const controllers = {};

// Criar um novo atleta
controllers.criar = async (req, res) => {
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

  const data = await Atleta.create({
    id_clube: id_clube,
    id_escalao: id_escalao,
    id_statusatleta: id_statusatleta,
    nome: nome,
    datanascimento: datanascimento,
    link: link,
    ratingfinal: ratingfinal,
    ratinggeral: ratinggeral,
    nomeencarregado: nomeencarregado,
    contactoencarregado: contactoencarregado,
  })
    .then((data) => data)
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });
  res.status(200).json({
    success: true,
    data: data,
  });
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

// Listar todos os atletas
controllers.listar = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query; // Obtem página e tamanho por query string
    const limit = parseInt(size); // Número de registros por página
    const offset = (page - 1) * limit; // Registros a pular

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
      ],
    });

    res.status(200).json({
      success: true,
      data: atletas.rows, // Dados da página atual
      totalItems: atletas.count, // Total de registros na tabela
      totalPages: Math.ceil(atletas.count / limit), // Total de páginas
      currentPage: parseInt(page), // Página atual
    });
  } catch (error) {
    console.error("Erro ao listar atletas: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro ao listar atletas.", error });
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

// Apagar atleta corrigido
controllers.apagar = async (req, res) => {
  console.log("Dados recebidos no req.body:", req.body); // Log para depuração
  const { id_atleta } = req.body; // Captura o id_atleta

  if (!id_atleta) {
    return res.status(400).json({
      success: false,
      message: "ID do atleta não fornecido.",
    });
  }

  try {
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

// APAGAR ISSO DEPOIS SO TO TESTANDO PORRA Q N VAI VOU EXPLODIR
controllers.testarModelo = async (req, res) => {
  try {
    const atletas = await Atleta.findAll({ limit: 1 });
    res.json({ success: true, data: atletas });
  } catch (error) {
    console.error("Erro ao acessar o modelo Atleta:", error);
    res.status(500).json({ success: false, message: "Erro no modelo Atleta.", error });
  }
};

controllers.atletasParaEquipa = async (req, res) => {
  const idEquipa = req.params.idEquipa;
  const filtros = req.body;
  const limit = 12;
  const offset = (filtros.page - 1) * limit;
  try {
    const equipa = await models.equipa.findOne({ where: { id_equipa: idEquipa } });

    if (!equipa) {
      return res.status(404).json({ success: false, message: "Equipa não encontrada." });
    }
    else {
      // Count total number of records
      const totalAtletas = await models.atleta.count({
        where: {
          id_escalao: {
            [Op.lte]: equipa.id_escalao,
          },
        }
      });

      // Calculate total number of pages
      const totalPages = Math.ceil(totalAtletas / limit);
      const atletas = await models.atleta.findAll({
        where: {
          id_escalao: {
            // Os escalões estão ordenados por id: 1 - mais novo, ultimo - mais velho, por isso apenas vamos receber os atletas com menor (ou igual) id_escalao
            [Op.lte]: equipa.id_escalao,
          },
        },
        include: [
          { model: models.escalao },
          { model: models.clube },
          {
            model: models.nacionalidade,
            through: { attributes: [] }
          },
          {
            model: models.posicao,
            through: { attributes: [] },
            include: { model: models.funcao }
          }
        ],
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                atleta.id_atleta IN (SELECT id_atleta FROM "EquipaAtleta" WHERE id_equipa = ${idEquipa})
              )`),
              'isInEquipa'
            ]
          ]
        },
        order: [[Sequelize.col('isInEquipa'), 'DESC']],
        limit: limit,
        offset: offset,

      });

      return res.status(200).json({ success: true, atletas, totalPages });
    }
  } catch (error) {
    console.error("Erro ao listar atletas por escalão:", error);
    res.status(500).json({ success: false, message: "Erro ao listar atletas por escalão.", error });
  }
}
module.exports = controllers;
