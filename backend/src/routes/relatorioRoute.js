const express = require('express');
const router = express.Router();
const RelatorioController = require("../controllers/RelatorioController.js");

router.get("/", RelatorioController.listar); // Mantém a rota raiz original
router.get("/listar/:page", RelatorioController.listar); // Nova rota para listar
router.get("/relatoriosData", RelatorioController.relatoriosData);
router.post("/criar", RelatorioController.criar);
router.delete("/apagar/:id_relatorio", RelatorioController.apagar);


// PEGA ULTIMOS VALORES
router.get("/ultimos/:id_atleta", RelatorioController.getLatestRatingsByAtleta);

router.get("/mensal/:id_atleta", RelatorioController.getMonthlyAverageRatings);

router.get("/mensal-atributo/:id_atleta", RelatorioController.getMonthlyAverageByAttribute);

// Essa rota deve ficar POR ÚLTIMO para evitar conflitos
router.get("/:id_atleta", RelatorioController.listarPorAtleta);

router.get("/scout/:id_utilizador", RelatorioController.listarPorScout);

router.get("/unico/:id", RelatorioController.getRelatorio)
module.exports = router;