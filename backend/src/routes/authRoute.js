const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

// Rota para login
router.post("/login", authController.login);

// (Opcional) Rota para registro de utilizadores, se precisar no futuro
router.post("/register", authController.register);

// (Opcional) Rota para verificar o token (para testar se um token JWT é válido)
router.get("/verify", authController.verifyToken, authController.tokenValidation);

router.get("/verify/admin", authController.verifyToken, authController.adminValidation);

module.exports = router;