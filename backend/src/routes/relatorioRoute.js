const express = require('express');
const router = express.Router();
const RelatorioController = require("../controllers/RelatorioController.js");

router.get("/", RelatorioController.listar); // Mantém a rota raiz original
router.get("/listar/:page", RelatorioController.listar); // Nova rota para listar
router.get("/relatoriosData", RelatorioController.relatoriosData);
router.post("/criar", RelatorioController.criar);
router.delete("/apagar/:id_relatorio", RelatorioController.apagar);
router.get("/:id_atleta", RelatorioController.listarPorAtleta); // Mantida!

module.exports = router;