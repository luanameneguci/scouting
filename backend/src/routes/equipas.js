
const express = require('express');
const router = express.Router();

const EquipaController = require("../controllers/EquipaController.js");

router.get("/", EquipaController.equipa_list); 
/*
Precisa de:
 - GET /:tipo/escaloes - Todos os escalões das equipas (prop e sombra dep)
    - Params: tipo de equipa
    - Res: lista de escalões
 - GET /:idEquipa - Informação da equipa + atletas
    - Params: idEquipa
    - Res: info da equipa + atletas
 - PUT/PATCH /:idAtleta- Editar atletas da equipa (add/remove, mudar posição)
    - Params: idAtleta, atleta
    - Res: atleta?
---> não sei se isto é melhor nos atletas mas //
 - GET - Receber todos os atletas
    - Res: atletas
 - GET - Filtrar os atletas
    - Params: filtros
    - Res: atletas
*/
module.exports = router;