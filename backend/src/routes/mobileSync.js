const express = require("express");
const router = express.Router();

const mobileSync = require("../controllers/mobileSync");

router.get("/atletas", mobileSync.SyncAtletas);
router.get("/jogos", mobileSync.SyncJogos);

module.exports = router;