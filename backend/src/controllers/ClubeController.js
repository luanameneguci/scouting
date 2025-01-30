const { Clube } = require('../models'); // Certifique-se de que o caminho está correto

const clubeController = {
    listarNomesClubes: async (req, res) => {
        try {
            const clubes = await Clube.findAll({ attributes: ['nome'] });
            res.status(200).json(clubes);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar nomes dos clubes', error });
        }
    }
};

module.exports = clubeController;
