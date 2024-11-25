
const express = require('express');
const router = express.Router();

const RelatorioController = require("../controllers/RelatorioController.js");

router.get("/", RelatorioController.listar); 

router.post("/criar", RelatorioController.criar);

router.delete("/apagar/:id_relatorio", RelatorioController.apagar);

router.get("/:id_atleta", RelatorioController.listarPorAtleta);

module.exports = router;