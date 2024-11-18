var DataTypes = require("sequelize").DataTypes;
var _EquipaAtleta = require("./EquipaAtleta");
var _EscalaoDivisao = require("./EscalaoDivisao");
var _JogoAtleta = require("./JogoAtleta");
var _JogoClube = require("./JogoClube");
var _PosicaoAtleta = require("./PosicaoAtleta");
var _UtilizadorJogo = require("./UtilizadorJogo");
var _atleta = require("./atleta");
var _clube = require("./clube");
var _divisao = require("./divisao");
var _equipa = require("./equipa");
var _escalao = require("./escalao");
var _funcao = require("./funcao");
var _jogo = require("./jogo");
var _nacionalidade = require("./nacionalidade");
var _nacionalidadeatleta = require("./nacionalidadeatleta");
var _notificacoes = require("./notificacoes");
var _posicao = require("./posicao");
var _relatorio = require("./relatorio");
var _statusatleta = require("./statusatleta");
var _tipoequipa = require("./tipoequipa");
var _tipoutilizador = require("./tipoutilizador");
var _utilizador = require("./utilizador");

function initModels(sequelize) {
  var EquipaAtleta = _EquipaAtleta(sequelize, DataTypes);
  var EscalaoDivisao = _EscalaoDivisao(sequelize, DataTypes);
  var JogoAtleta = _JogoAtleta(sequelize, DataTypes);
  var JogoClube = _JogoClube(sequelize, DataTypes);
  var PosicaoAtleta = _PosicaoAtleta(sequelize, DataTypes);
  var UtilizadorJogo = _UtilizadorJogo(sequelize, DataTypes);
  var atleta = _atleta(sequelize, DataTypes);
  var clube = _clube(sequelize, DataTypes);
  var divisao = _divisao(sequelize, DataTypes);
  var equipa = _equipa(sequelize, DataTypes);
  var escalao = _escalao(sequelize, DataTypes);
  var funcao = _funcao(sequelize, DataTypes);
  var jogo = _jogo(sequelize, DataTypes);
  var nacionalidade = _nacionalidade(sequelize, DataTypes);
  var nacionalidadeatleta = _nacionalidadeatleta(sequelize, DataTypes);
  var notificacoes = _notificacoes(sequelize, DataTypes);
  var posicao = _posicao(sequelize, DataTypes);
  var relatorio = _relatorio(sequelize, DataTypes);
  var statusatleta = _statusatleta(sequelize, DataTypes);
  var tipoequipa = _tipoequipa(sequelize, DataTypes);
  var tipoutilizador = _tipoutilizador(sequelize, DataTypes);
  var utilizador = _utilizador(sequelize, DataTypes);

  atleta.belongsToMany(equipa, { as: 'id_equipa_equipas', through: EquipaAtleta, foreignKey: "id_atleta", otherKey: "id_equipa" });
  atleta.belongsToMany(jogo, { as: 'id_jogo_jogos', through: JogoAtleta, foreignKey: "id_atleta", otherKey: "id_jogo" });
  atleta.belongsToMany(nacionalidade, { as: 'id_nacionalidade_nacionalidades', through: nacionalidadeatleta, foreignKey: "id_atleta", otherKey: "id_nacionalidade" });
  atleta.belongsToMany(posicao, { as: 'id_posicao_posicaos', through: PosicaoAtleta, foreignKey: "id_atleta", otherKey: "id_posicao" });
  clube.belongsToMany(jogo, { as: 'id_jogo_jogo_JogoClubes', through: JogoClube, foreignKey: "id_clube", otherKey: "id_jogo" });
  divisao.belongsToMany(escalao, { as: 'id_escalao_escalaos', through: EscalaoDivisao, foreignKey: "id_divisao", otherKey: "id_escalao" });
  equipa.belongsToMany(atleta, { as: 'id_atleta_atleta', through: EquipaAtleta, foreignKey: "id_equipa", otherKey: "id_atleta" });
  escalao.belongsToMany(divisao, { as: 'id_divisao_divisaos', through: EscalaoDivisao, foreignKey: "id_escalao", otherKey: "id_divisao" });
  jogo.belongsToMany(atleta, { as: 'id_atleta_atleta_JogoAtleta', through: JogoAtleta, foreignKey: "id_jogo", otherKey: "id_atleta" });
  jogo.belongsToMany(clube, { as: 'id_clube_clubes', through: JogoClube, foreignKey: "id_jogo", otherKey: "id_clube" });
  jogo.belongsToMany(utilizador, { as: 'id_utilizador_utilizadors', through: UtilizadorJogo, foreignKey: "id_jogo", otherKey: "id_utilizador" });
  nacionalidade.belongsToMany(atleta, { as: 'id_atleta_atleta_nacionalidadeatleta', through: nacionalidadeatleta, foreignKey: "id_nacionalidade", otherKey: "id_atleta" });
  posicao.belongsToMany(atleta, { as: 'id_atleta_atleta_PosicaoAtleta', through: PosicaoAtleta, foreignKey: "id_posicao", otherKey: "id_atleta" });
  utilizador.belongsToMany(jogo, { as: 'id_jogo_jogo_UtilizadorJogos', through: UtilizadorJogo, foreignKey: "id_utilizador", otherKey: "id_jogo" });
  EquipaAtleta.belongsTo(atleta, { as: "id_atleta_atletum", foreignKey: "id_atleta"});
  atleta.hasMany(EquipaAtleta, { as: "EquipaAtleta", foreignKey: "id_atleta"});
  JogoAtleta.belongsTo(atleta, { as: "id_atleta_atletum", foreignKey: "id_atleta"});
  atleta.hasMany(JogoAtleta, { as: "JogoAtleta", foreignKey: "id_atleta"});
  PosicaoAtleta.belongsTo(atleta, { as: "id_atleta_atletum", foreignKey: "id_atleta"});
  atleta.hasMany(PosicaoAtleta, { as: "PosicaoAtleta", foreignKey: "id_atleta"});
  nacionalidadeatleta.belongsTo(atleta, { as: "id_atleta_atletum", foreignKey: "id_atleta"});
  atleta.hasMany(nacionalidadeatleta, { as: "nacionalidadeatleta", foreignKey: "id_atleta"});
  relatorio.belongsTo(atleta, { as: "id_atleta_atletum", foreignKey: "id_atleta"});
  atleta.hasMany(relatorio, { as: "relatorios", foreignKey: "id_atleta"});
  JogoClube.belongsTo(clube, { as: "id_clube_clube", foreignKey: "id_clube"});
  clube.hasMany(JogoClube, { as: "JogoClubes", foreignKey: "id_clube"});
  atleta.belongsTo(clube, { as: "id_clube_clube", foreignKey: "id_clube"});
  clube.hasMany(atleta, { as: "atleta", foreignKey: "id_clube"});
  EscalaoDivisao.belongsTo(divisao, { as: "id_divisao_divisao", foreignKey: "id_divisao"});
  divisao.hasMany(EscalaoDivisao, { as: "EscalaoDivisaos", foreignKey: "id_divisao"});
  EquipaAtleta.belongsTo(equipa, { as: "id_equipa_equipa", foreignKey: "id_equipa"});
  equipa.hasMany(EquipaAtleta, { as: "EquipaAtleta", foreignKey: "id_equipa"});
  EscalaoDivisao.belongsTo(escalao, { as: "id_escalao_escalao", foreignKey: "id_escalao"});
  escalao.hasMany(EscalaoDivisao, { as: "EscalaoDivisaos", foreignKey: "id_escalao"});
  atleta.belongsTo(escalao, { as: "id_escalao_escalao", foreignKey: "id_escalao"});
  escalao.hasMany(atleta, { as: "atleta", foreignKey: "id_escalao"});
  jogo.belongsTo(escalao, { as: "id_escalao_escalao", foreignKey: "id_escalao"});
  escalao.hasMany(jogo, { as: "jogos", foreignKey: "id_escalao"});
  JogoAtleta.belongsTo(jogo, { as: "id_jogo_jogo", foreignKey: "id_jogo"});
  jogo.hasMany(JogoAtleta, { as: "JogoAtleta", foreignKey: "id_jogo"});
  JogoClube.belongsTo(jogo, { as: "id_jogo_jogo", foreignKey: "id_jogo"});
  jogo.hasMany(JogoClube, { as: "JogoClubes", foreignKey: "id_jogo"});
  UtilizadorJogo.belongsTo(jogo, { as: "id_jogo_jogo", foreignKey: "id_jogo"});
  jogo.hasMany(UtilizadorJogo, { as: "UtilizadorJogos", foreignKey: "id_jogo"});
  relatorio.belongsTo(jogo, { as: "id_jogo_jogo", foreignKey: "id_jogo"});
  jogo.hasMany(relatorio, { as: "relatorios", foreignKey: "id_jogo"});
  nacionalidadeatleta.belongsTo(nacionalidade, { as: "id_nacionalidade_nacionalidade", foreignKey: "id_nacionalidade"});
  nacionalidade.hasMany(nacionalidadeatleta, { as: "nacionalidadeatleta", foreignKey: "id_nacionalidade"});
  PosicaoAtleta.belongsTo(posicao, { as: "id_posicao_posicao", foreignKey: "id_posicao"});
  posicao.hasMany(PosicaoAtleta, { as: "PosicaoAtleta", foreignKey: "id_posicao"});
  funcao.belongsTo(posicao, { as: "id_posicao_posicao", foreignKey: "id_posicao"});
  posicao.hasMany(funcao, { as: "funcaos", foreignKey: "id_posicao"});
  atleta.belongsTo(statusatleta, { as: "id_statusatleta_statusatletum", foreignKey: "id_statusatleta"});
  statusatleta.hasMany(atleta, { as: "atleta", foreignKey: "id_statusatleta"});
  equipa.belongsTo(tipoequipa, { as: "id_tipoequipa_tipoequipa", foreignKey: "id_tipoequipa"});
  tipoequipa.hasMany(equipa, { as: "equipas", foreignKey: "id_tipoequipa"});
  utilizador.belongsTo(tipoutilizador, { as: "id_tipoutilizador_tipoutilizador", foreignKey: "id_tipoutilizador"});
  tipoutilizador.hasMany(utilizador, { as: "utilizadors", foreignKey: "id_tipoutilizador"});
  UtilizadorJogo.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(UtilizadorJogo, { as: "UtilizadorJogos", foreignKey: "id_utilizador"});
  notificacoes.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(notificacoes, { as: "notificacos", foreignKey: "id_utilizador"});
  relatorio.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(relatorio, { as: "relatorios", foreignKey: "id_utilizador"});

  return {
    EquipaAtleta,
    EscalaoDivisao,
    JogoAtleta,
    JogoClube,
    PosicaoAtleta,
    UtilizadorJogo,
    atleta,
    clube,
    divisao,
    equipa,
    escalao,
    funcao,
    jogo,
    nacionalidade,
    nacionalidadeatleta,
    notificacoes,
    posicao,
    relatorio,
    statusatleta,
    tipoequipa,
    tipoutilizador,
    utilizador,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;