const express = require("express");
const router = express.Router();

const mobileSync = require("../controllers/mobileSync");

router.get("/inic", mobileSync.pagInicial);
router.get("/userData", mobileSync.getUsername);
router.get("/jogos", mobileSync.SyncJogos);

module.exports = router;