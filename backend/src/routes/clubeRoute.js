const express = require('express');
const router = express.Router();
const { Clube } = require('../models'); // Certifique-se de que o caminho está correto

// Rota para listar todos os clubes
router.get('/clube/listar', async (req, res) => {
    try {
        const clubes = await Clube.findAll();
        res.status(200).json(clubes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar clubes', error });
    }
});

module.exports = router;
