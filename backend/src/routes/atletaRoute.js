const express = require("express");
const router = express.Router();
const atletaController = require("../controllers/AtletaController");
const authController = require("../controllers/AuthController");
const authMiddleware = authController.verifyToken;
// Rota para listar todos os atletas
router.get("/listar", atletaController.listar);

router.get("/listarPorRating", atletaController.getAboveAverage);

router.get("/getRatingsData", atletaController.getRatingsData);

router.get("/getAgesData", atletaController.getAgesData);

router.get("/getTotalAthletes", atletaController.getTotalAthletes);

router.get("/avgRating", atletaController.getAverageRating);
// Rota para criar um novo atleta
router.post("/criar", atletaController.criar);

// Rota para editar um atleta
router.put("/editar/:id_atleta", atletaController.editar);

// Rota para apagar um atleta
router.delete("/apagar", atletaController.apagar);

// Página para fazer os atletas, e rota para buscar um atleta pelo ID
router.get("/:id_atleta", atletaController.buscarPorId);

// Página de equipas, apenas atletas com escalao inferior ou igual à da equipa (e filtros)
router.post("/todos/:idEquipa", authMiddleware, atletaController.atletasParaEquipa);

router.get("/nacionalidades", authMiddleware, atletaController.allNacionalidades);

router.get("/clubes", authMiddleware, atletaController.allClubes);
module.exports = router;
