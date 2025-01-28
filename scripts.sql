CREATE TABLE tipoutilizador (
    id_tipoutilizador SERIAL PRIMARY KEY,
    designacao VARCHAR(1024) NOT NULL
);

CREATE TABLE utilizador (
    id_utilizador SERIAL PRIMARY KEY,
    id_tipoutilizador INTEGER NOT NULL,
    nome VARCHAR(1024) NOT NULL,
    email VARCHAR(1024) NOT NULL,
    password VARCHAR(1024) NOT NULL,
    telefone VARCHAR(1024) NOT NULL,
    FOREIGN KEY (id_tipoutilizador) REFERENCES tipoutilizador(id_tipoutilizador) ON UPDATE CASCADE
);

CREATE TABLE clube (
    id_clube SERIAL PRIMARY KEY,
    nome VARCHAR(1024) NOT NULL
);

CREATE TABLE divisao (
    id_divisao SERIAL PRIMARY KEY,
    designacao VARCHAR(1024) NOT NULL
);

CREATE TABLE escalao (
    id_escalao SERIAL PRIMARY KEY,
    designacao VARCHAR(1024) NOT NULL
);

CREATE TABLE tipoequipa (
    id_tipoequipa SERIAL PRIMARY KEY,
    designacao VARCHAR(1024) NOT NULL
);

CREATE TABLE posicao (
    id_posicao SERIAL PRIMARY KEY,
    designacao VARCHAR(1024) NOT NULL
);

CREATE TABLE statusatleta (
    id_statusatleta SERIAL PRIMARY KEY,
    designacao VARCHAR(1024) NOT NULL
);

CREATE TABLE atleta (
    id_atleta SERIAL PRIMARY KEY,
    id_clube INTEGER NOT NULL,
    id_escalao INTEGER NOT NULL,
    id_statusatleta INTEGER,
    nome VARCHAR(1024) NOT NULL,
    datanascimento DATE,
    link VARCHAR(1024),
    ratingfinal REAL,
    ratinggeral REAL,
    nomeencarregado VARCHAR(1024),
    contactoencarregado VARCHAR(1024),
    FOREIGN KEY (id_clube) REFERENCES clube(id_clube) ON UPDATE CASCADE,
    FOREIGN KEY (id_escalao) REFERENCES escalao(id_escalao) ON UPDATE CASCADE,
    FOREIGN KEY (id_statusatleta) REFERENCES statusatleta(id_statusatleta) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE equipa (
    id_equipa SERIAL PRIMARY KEY,
    id_tipoequipa INTEGER NOT NULL,
    id_escalao INTEGER NOT NULL,
    id_divisao INTEGER,
    FOREIGN KEY (id_tipoequipa) REFERENCES tipoequipa(id_tipoequipa) ON UPDATE CASCADE,
    FOREIGN KEY (id_escalao) REFERENCES escalao(id_escalao) ON UPDATE CASCADE,
    FOREIGN KEY (id_divisao) REFERENCES divisao(id_divisao) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE funcao (
    id_funcao SERIAL PRIMARY KEY,
    designacao VARCHAR(1024) NOT NULL,
    id_posicao INTEGER,
    FOREIGN KEY (id_posicao) REFERENCES posicao(id_posicao) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE jogo (
    id_jogo SERIAL PRIMARY KEY,
    id_escalao INTEGER NOT NULL,
    data TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (id_escalao) REFERENCES escalao(id_escalao) ON UPDATE CASCADE
);

CREATE TABLE relatorio (
    id_relatorio SERIAL PRIMARY KEY,
    id_utilizador INTEGER NOT NULL,
    id_jogo INTEGER NOT NULL,
    id_atleta INTEGER NOT NULL,
    tecnica INTEGER NOT NULL,
    velocidade INTEGER NOT NULL,
    atitudecompetitiva INTEGER NOT NULL,
    inteligencia INTEGER NOT NULL,
    altura REAL NOT NULL,
    morfologia VARCHAR(1024) NOT NULL,
    apontamentos VARCHAR(1024),
    data DATE NOT NULL,
    FOREIGN KEY (id_utilizador) REFERENCES utilizador(id_utilizador) ON UPDATE CASCADE,
    FOREIGN KEY (id_jogo) REFERENCES jogo(id_jogo) ON UPDATE CASCADE,
    FOREIGN KEY (id_atleta) REFERENCES atleta(id_atleta) ON UPDATE CASCADE
);

CREATE TABLE nacionalidade (
    id_nacionalidade SERIAL PRIMARY KEY,
    designacao VARCHAR(1024) NOT NULL,
    urlbandeira VARCHAR(1024),
    abreviatura VARCHAR(1024)
);

CREATE TABLE notificacoes (
    id_notificacao SERIAL PRIMARY KEY,
    id_utilizador INTEGER NOT NULL,
    data TIMESTAMPTZ NOT NULL,
    texto VARCHAR(1024) NOT NULL,
    FOREIGN KEY (id_utilizador) REFERENCES utilizador(id_utilizador) ON UPDATE CASCADE
);

CREATE TABLE EquipaAtleta (
    id_equipa INTEGER NOT NULL,
    id_atleta INTEGER NOT NULL,
    posicaoformacao INTEGER,
    PRIMARY KEY (id_equipa, id_atleta),
    FOREIGN KEY (id_equipa) REFERENCES equipa(id_equipa) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_atleta) REFERENCES atleta(id_atleta) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE EscalaoDivisao (
    id_escalao INTEGER NOT NULL,
    id_divisao INTEGER NOT NULL,
    PRIMARY KEY (id_escalao, id_divisao),
    FOREIGN KEY (id_escalao) REFERENCES escalao(id_escalao) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_divisao) REFERENCES divisao(id_divisao) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE JogoAtleta (
    id_jogo INTEGER NOT NULL,
    id_atleta INTEGER NOT NULL,
    PRIMARY KEY (id_jogo, id_atleta),
    FOREIGN KEY (id_jogo) REFERENCES jogo(id_jogo) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_atleta) REFERENCES atleta(id_atleta) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE JogoClube (
    id_jogo INTEGER NOT NULL,
    id_clube INTEGER NOT NULL,
    PRIMARY KEY (id_jogo, id_clube),
    FOREIGN KEY (id_jogo) REFERENCES jogo(id_jogo) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_clube) REFERENCES clube(id_clube) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE PosicaoAtleta (
    id_posicao INTEGER NOT NULL,
    id_atleta INTEGER NOT NULL,
    PRIMARY KEY (id_posicao, id_atleta),
    FOREIGN KEY (id_posicao) REFERENCES posicao(id_posicao) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_atleta) REFERENCES atleta(id_atleta) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE UtilizadorJogo (
    id_utilizador INTEGER NOT NULL,
    id_jogo INTEGER NOT NULL,
    PRIMARY KEY (id_utilizador, id_jogo),
    FOREIGN KEY (id_utilizador) REFERENCES utilizador(id_utilizador) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_jogo) REFERENCES jogo(id_jogo) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE NacionalidadeAtleta (
    id_nacionalidade INTEGER NOT NULL,
    id_atleta INTEGER NOT NULL,
    PRIMARY KEY (id_nacionalidade, id_atleta),
    FOREIGN KEY (id_nacionalidade) REFERENCES nacionalidade(id_nacionalidade) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_atleta) REFERENCES atleta(id_atleta) ON UPDATE CASCADE ON DELETE CASCADE
);

