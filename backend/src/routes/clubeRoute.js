const express = require('express');
const router = express.Router();
const clubeController = require('../controllers/ClubeController'); // Certifique-se de que o caminho está correto

// Rota para listar todos os clubes
router.get('/listar', clubeController.listarTodosClubes);

module.exports = router;
