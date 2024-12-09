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
  // First, initialize models
  var posicao = _posicao(sequelize, DataTypes);
  var tipoequipa = _tipoequipa(sequelize, DataTypes);
  var statusatleta = _statusatleta(sequelize, DataTypes);
  var clube = _clube(sequelize, DataTypes);
  var escalao = _escalao(sequelize, DataTypes);
  var atleta = _atleta(sequelize, DataTypes);
  var divisao = _divisao(sequelize, DataTypes);
  var equipa = _equipa(sequelize, DataTypes);
  var funcao = _funcao(sequelize, DataTypes);
  var jogo = _jogo(sequelize, DataTypes);
  var nacionalidade = _nacionalidade(sequelize, DataTypes);
  var tipoutilizador = _tipoutilizador(sequelize, DataTypes);
  var utilizador = _utilizador(sequelize, DataTypes);
  var notificacoes = _notificacoes(sequelize, DataTypes);
  var relatorio = _relatorio(sequelize, DataTypes);

  // Initialize junction tables
  var EquipaAtleta = _EquipaAtleta(sequelize, DataTypes);
  var EscalaoDivisao = _EscalaoDivisao(sequelize, DataTypes);
  var JogoAtleta = _JogoAtleta(sequelize, DataTypes);
  var JogoClube = _JogoClube(sequelize, DataTypes);
  var PosicaoAtleta = _PosicaoAtleta(sequelize, DataTypes);
  var UtilizadorJogo = _UtilizadorJogo(sequelize, DataTypes);
  var nacionalidadeatleta = _nacionalidadeatleta(sequelize, DataTypes);

  // Associations
  // Core model relationships
  atleta.belongsTo(clube, { foreignKey: "id_clube" });
  clube.hasMany(atleta, { foreignKey: "id_clube" });

  atleta.belongsTo(escalao, { foreignKey: "id_escalao" });
  escalao.hasMany(atleta, { foreignKey: "id_escalao" });

  atleta.belongsTo(statusatleta, { foreignKey: "id_statusatleta" });
  statusatleta.hasMany(atleta, { foreignKey: "id_statusatleta" });

  equipa.belongsTo(tipoequipa, { foreignKey: "id_tipoequipa" });
  tipoequipa.hasMany(equipa, { foreignKey: "id_tipoequipa" });

  utilizador.belongsTo(tipoutilizador, { foreignKey: "id_tipoutilizador" });
  tipoutilizador.hasMany(utilizador, { foreignKey: "id_tipoutilizador" });


  jogo.belongsTo(escalao, { foreignKey: "id_escalao" });
  escalao.hasMany(jogo, { foreignKey: "id_escalao" });

  // Foreign keys for many-to-many junction tables
  EquipaAtleta.belongsTo(atleta, { foreignKey: "id_atleta" });
  EquipaAtleta.belongsTo(equipa, { foreignKey: "id_equipa" });

  JogoAtleta.belongsTo(atleta, { foreignKey: "id_atleta" });
  JogoAtleta.belongsTo(jogo, { foreignKey: "id_jogo" });

  JogoClube.belongsTo(clube, { foreignKey: "id_clube" });
  JogoClube.belongsTo(jogo, { foreignKey: "id_jogo" });

  nacionalidadeatleta.belongsTo(atleta, { foreignKey: "id_atleta" });
  nacionalidadeatleta.belongsTo(nacionalidade, { foreignKey: "id_nacionalidade" });

  PosicaoAtleta.belongsTo(atleta, { foreignKey: "id_atleta" });
  PosicaoAtleta.belongsTo(posicao, { foreignKey: "id_posicao" });

  funcao.belongsTo(posicao, { foreignKey: "id_posicao" });
  posicao.hasMany(funcao, { foreignKey: "id_posicao" });

  relatorio.belongsTo(atleta, { foreignKey: "id_atleta" });
  atleta.hasMany(relatorio, { foreignKey: "id_atleta" });

  relatorio.belongsTo(utilizador, { foreignKey: "id_utilizador" });
  utilizador.hasMany(relatorio, { foreignKey: "id_utilizador" });
  // Many-to-Many relationships with junction tables
  // package.belongsToMany(product, { as: 'productid_products', through: produtos_do_pacote, foreignKey: "packageid", otherKey: "productid" });

  atleta.belongsToMany(equipa, { through: EquipaAtleta, foreignKey: "id_atleta", otherKey: "id_equipa" });
  equipa.belongsToMany(atleta, { through: EquipaAtleta, foreignKey: "id_equipa", otherKey: "id_atleta" });

  atleta.belongsToMany(jogo, { through: JogoAtleta, foreignKey: "id_atleta", otherKey: "id_jogo" });
  jogo.belongsToMany(atleta, { through: JogoAtleta, foreignKey: "id_jogo", otherKey: "id_atleta" });

  clube.belongsToMany(jogo, { through: JogoClube, foreignKey: "id_clube", otherKey: "id_jogo" });
  jogo.belongsToMany(clube, { through: JogoClube, foreignKey: "id_jogo", otherKey: "id_clube" });

  atleta.belongsToMany(nacionalidade, { through: nacionalidadeatleta, foreignKey: "id_atleta", otherKey: "id_nacionalidade" });
  nacionalidade.belongsToMany(atleta, { through: nacionalidadeatleta, foreignKey: "id_nacionalidade", otherKey: "id_atleta" });

  atleta.belongsToMany(posicao, { through: PosicaoAtleta, foreignKey: "id_atleta", otherKey: "id_posicao" });
  posicao.belongsToMany(atleta, { through: PosicaoAtleta, foreignKey: "id_posicao", otherKey: "id_atleta" });

  divisao.belongsToMany(escalao, { through: EscalaoDivisao, foreignKey: "id_divisao", otherKey: "id_escalao" });
  escalao.belongsToMany(divisao, { through: EscalaoDivisao, foreignKey: "id_escalao", otherKey: "id_divisao" });

  jogo.belongsToMany(utilizador, { through: UtilizadorJogo, foreignKey: "id_jogo", otherKey: "id_utilizador" });
  utilizador.belongsToMany(jogo, { through: UtilizadorJogo, foreignKey: "id_utilizador", otherKey: "id_jogo" });


  return {
    atleta,
    clube,
    divisao,
    escalao,
    equipa,
    funcao,
    jogo,
    nacionalidade,
    posicao,
    relatorio,
    statusatleta,
    tipoequipa,
    tipoutilizador,
    utilizador,
    notificacoes,
    EquipaAtleta,
    EscalaoDivisao,
    JogoAtleta,
    JogoClube,
    PosicaoAtleta,
    UtilizadorJogo,
    nacionalidadeatleta,
    sequelize
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
