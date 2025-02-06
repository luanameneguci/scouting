const express = require("express");
const router = express.Router();
const atletaController = require("../controllers/AtletaController");
const authController = require("../controllers/AuthController");
const authMiddleware = authController.verifyToken;

// 1) Rotas "fixas"
router.get("/nacionalidades", atletaController.listarNacionalidades);
router.delete("/apagar", atletaController.apagar);
router.get("/listar", atletaController.listar);
router.get("/listarPorRating", atletaController.getAboveAverage);
router.get("/getRatingsData", atletaController.getRatingsData);
router.get("/getAgesData", atletaController.getAgesData);
router.get("/getTotalAthletes", atletaController.getTotalAthletes);
router.get("/avgRating", atletaController.getAverageRating);
router.get("/posicoes", atletaController.listarPosicoes);

// 2) Criação e edição de atleta
router.post("/criar", atletaController.criar);
router.put("/editar/:id_atleta", atletaController.editar);

// 3) Filtrar atletas (POST), e rotas exclusivas
router.post("/filtrar", atletaController.filtrarAtletas);
router.post("/except/:idEquipa", authMiddleware, atletaController.atletasParaEquipa);
router.get("/clubes", authMiddleware, atletaController.allClubes);

// 4) Rotas genericas
router.get("/:id_atleta", atletaController.buscarPorId);

module.exports = router;

