const express = require("express");
const router = express.Router();
const atletaController = require("../controllers/AtletaController");

// Rota para listar todos os atletas
router.get("/listar", atletaController.listar);

router.get("/getRatingsData", atletaController.getRatingsData);

router.get("/getAgesData", atletaController.getAgesData);

router.get("/getTotalAthletes", atletaController.getTotalAthletes);

// Rota para criar um novo atleta
router.post("/criar", atletaController.criar);

// Rota para editar um atleta
router.put("/editar/:id_atleta", atletaController.editar);

// Rota para apagar um atleta
router.delete("/apagar", atletaController.apagar);

// aAPPORRAAAAAAA
router.get("/testarModelo", atletaController.testarModelo);

// Página de equipas, apenas atletas com escalao inferior ou igual à da equipa (e filtros)
router.post("/todos/:idEquipa", atletaController.atletasParaEquipa);

module.exports = router;
