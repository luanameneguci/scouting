const express = require('express');
const router = express.Router();

const JogoController = require("../controllers/JogoController.js");

router.get("/", JogoController.listar);  

router.get("/dash", JogoController.listarDash);  

// Rota para buscar atletas de um escalão
router.get("/atletas/:id_escalao/:id_clube1?/:id_clube2?", JogoController.getAtletasPorEscalao);


// Rota para adicionar um atleta a um jogo
router.post("/adicionarAtleta", JogoController.addAtletaToJogo);

// Rota para criar um jogo
router.post("/criar", JogoController.criarJogo);


//router.post("/criar", JogoController.criar);

/* router.delete("/apagar/:id_jogo", JogoController.apagar); */
/* 
router.get("/:id_atleta", JogoController.listarPorAtleta); */

module.exports = router;