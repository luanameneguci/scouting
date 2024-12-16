
const express = require('express');
const router = express.Router();
/*
const EquipaController = require("../controllers/EquipaController.js");

router.get("/:idEquipa", EquipaController.single_equipa); 
router.get("/:tipoEquipa/escaloes", EquipaController.escaloes_equipa); 
router.put("/:idEquipa/:idAtleta/:novaPosicao", EquipaController.alterar_posicao_atleta); 


Precisa de:
 - GET /:tipoEquipa/escaloes - Todos os escalões das equipas (prop e sombra dep)
    - Params: tipo de equipa
    - Res: lista de escalões
 - X - GET /:idEquipa - Informação da equipa + atletas
    - Params: idEquipa
    - Res: info da equipa + atletas
 - PUT/PATCH /:idEquipa/:idAtleta/:novaPosicao- Editar atletas da equipa (add/remove, mudar posição)
    - Params: idAtleta, novaPosicao (se for 0, é para remover)
    - Res: atleta?
---> não sei se isto é melhor nos atletas mas //
 - GET - Receber todos os atletas
    - Res: atletas
 - GET - Filtrar os atletas
    - Params: filtros
    - Res: atletas
*/
module.exports = router;