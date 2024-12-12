const express = require('express');
const router = express.Router();

const JogoController = require("../controllers/JogoController.js");

router.get("/", JogoController.listar);  

router.post("/criar", JogoController.criar);

/* router.delete("/apagar/:id_jogo", JogoController.apagar); */
/* 
router.get("/:id_atleta", JogoController.listarPorAtleta); */

module.exports = router;