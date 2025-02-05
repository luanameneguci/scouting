const express = require('express');
const router = express.Router();
const UtilizadorController = require('../controllers/UtilizadorController');

// Rotas de CRUD para Utilizador
router.get('/', UtilizadorController.listar); // Listar todos os utilizadores
<<<<<<< HEAD
=======

>>>>>>> parent of 4b1cc8b43 (commit 2)
/* router.post('/criar', UtilizadorController.criar); // Criar um novo utilizador */
router.put('/:id', UtilizadorController.atualizar); // Atualizar um utilizador existente
router.delete('/:id', UtilizadorController.remover); // Remover um utilizador
router.get('/treinadores', UtilizadorController.listarTreinadores);

// Rota para associar um utilizador a um jogo
router.post('/associar-jogo', UtilizadorController.associarJogo); // Associar utilizador a um jogo
router.post('/associar-jogo-existente/:id', UtilizadorController.associarJogoExistente); // Associar utilizador a um jogo existente


module.exports = router;