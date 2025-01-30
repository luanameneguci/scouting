const express = require('express');
const router = express.Router();

const ClubeController = require("../controllers/ClubeController.js");

// Rota para listar todos os clubes
router.get("/listar", ClubeController.listar);  

module.exports = router;
