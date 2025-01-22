const express = require('express');
const router = express.Router();
const UtilizadorController = require('../controllers/UtilizadorController');

// Rotas de CRUD para Utilizador
router.get('/', UtilizadorController.listar); // Listar todos os utilizadores
router.post('/', UtilizadorController.criar); // Criar um novo utilizador
router.put('/:id', UtilizadorController.atualizar); // Atualizar um utilizador existente
router.delete('/:id', UtilizadorController.remover); // Remover um utilizador

// Rota para associar um utilizador a um jogo
router.post('/associar-jogo', UtilizadorController.associarJogo); // Associar utilizador a um jogo

module.exports = router;