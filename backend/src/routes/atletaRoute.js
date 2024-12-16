const express = require("express");
const router = express.Router();
const atletaController = require("../controllers/AtletaController");

// Rota para listar todos os atletas
router.get("/listar", atletaController.listar);

// Rota para criar um novo atleta
router.post("/criar", atletaController.criar);

// Rota para editar um atleta
router.put("/editar/:id_atleta", atletaController.editar);

// Rota para apagar um atleta
router.delete("/apagar", atletaController.apagar);

module.exports = router;
