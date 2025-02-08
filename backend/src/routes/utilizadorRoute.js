const express = require('express');
const router = express.Router();
const UtilizadorController = require('../controllers/UtilizadorController');

// Rotas de CRUD para Utilizador
router.get('/utilizador/', UtilizadorController.listar); // Listar todos os utilizadores
router.post('/utilizador/', UtilizadorController.criar); // Criar um novo utilizador
router.get('/utilizador/:id', UtilizadorController.getUtilizador); // Listar todos os utilizadores
router.put('/utilizador/:id', UtilizadorController.atualizar); // Atualizar um utilizador existente
router.delete('/utilizador/:id', UtilizadorController.remover); // Remover um utilizador
router.get('/utilizadores/treinadores/', UtilizadorController.listarTreinadores);

// Rota para associar um utilizador a um jogo
router.post('/associar-jogo', UtilizadorController.associarJogo); // Associar utilizador a um jogo
router.post('/associar-jogo-existente/:id', UtilizadorController.associarJogoExistente); // Associar utilizador a um jogo existente


module.exports = router;