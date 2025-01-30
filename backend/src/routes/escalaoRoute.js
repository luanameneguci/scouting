const express = require('express');
const router = express.Router();
const escalaoController = require('../controllers/EscalaoController'); // Importando o controller

// Rota para listar todos os escalões
router.get('/listar', escalaoController.listar); 

module.exports = router;
