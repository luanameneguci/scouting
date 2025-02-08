require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Import cors
const homeRouter = require('./routes/home.js');
const equipasRouter = require('./routes/equipas.js');
const jogoRouter = require('./routes/jogoRoute.js');
const atletaRouter = require('./routes/atletaRoute.js');
const relatorioRouter = require('./routes/relatorioRoute.js');
const utilizadorRouter = require('./routes/utilizadorRoute');
const authRouter = require('./routes/authRoute.js');
const clubeRouter = require('./routes/clubeRoute.js');
const escalaoRouter = require('./routes/escalaoRoute.js');
/* const tipoEquipasRouter = require('./routes/tipoEquipas.js'); */
const cookieParser = require('cookie-parser');
const mobileSync = require('./routes/mobileSync.js');
const sequelize = require('./models/database');
const initModels = require("./models/init-models"); // Inicializa os modelos
const models = initModels(sequelize); // Vincula os modelos ao Sequelize
const bcrypt = require("bcryptjs");


const app = express();
const port = 8080;

// Configurações
app.set('port', process.env.PORT || 8080);

app.use(cookieParser()); // Use cookie-parser middleware


// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Apply CORS globally


// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// Adicionar logs para depuração (ponto 1)
app.use((req, res, next) => {
    console.log("Requisição recebida:", {
        method: req.method,
        url: req.url,
        body: req.body,
        headers: req.headers
    });
    next();
});


/*
// Route para criar os dados iniciais é favor não descomentar
app.get('/inicial', async (req, res) => {
    const query1 = `
        INSERT INTO tipoutilizador (designacao) VALUES 
('Scout'), 
('Admin'), 
('Convidado');

INSERT INTO escalao (designacao) VALUES 
('SUB-4'), ('SUB-5'), ('SUB-6'), ('SUB-7'), ('SUB-8'), 
('SUB-9'), ('SUB-10'), ('SUB-11'), ('SUB-12'), ('SUB-13'), 
('SUB-14'), ('SUB-15'), ('SUB-16'), ('SUB-17'), ('SUB-18'), 
('SUB-19'), ('SUB-20'), ('SUB-21'), ('SUB-23'), ('Séniores');

INSERT INTO divisao (designacao) VALUES 
('A'), 
('B'), 
('C');

INSERT INTO funcao (designacao) VALUES 
('ATA'), 
('MED'), 
('DEF'), 
('GR');

INSERT INTO tipoequipa (designacao) VALUES 
('Sombra'), 
('Própria');

INSERT INTO statusatleta (designacao) VALUES 
('Ativo'), 
('Escondido'), 
('Inválido');

INSERT INTO posicao (id_funcao, designacao) VALUES 
(4, 'GR'), 
(3, 'DD'), 
(3, 'DE'), 
(3, 'DC'), 
(3, 'LD'), 
(3, 'LE'), 
(2, 'MD'), 
(2, 'ME'), 
(2, 'MC'), 
(2, 'MCD'), 
(2, 'MCO'), 
(2, 'MEO'), 
(2, 'MDO'), 
(1, 'ED'), 
(1, 'EE'), 
(1, 'SA'), 
(1, 'PL');

    `;
    const query2 = `
        INSERT INTO clube (nome) VALUES
('FC Porto'),
('SL Benfica'),
('Sporting CP'),
('SC Braga'),
('Vitória SC'),
('GD Chaves'),
('Rio Ave FC'),
('Boavista FC'),
('Estoril Praia'),
('Marítimo'),
('Paços de Ferreira'),
('Moreirense FC'),
('Gil Vicente FC'),
('CS Marítimo'),
('Portimonense SC');

INSERT INTO nacionalidade (designacao, urlbandeira, abreviatura) VALUES
('Portugal', 'https://restcountries.com/v3.1/alpha/pt', 'PT'),
('Brasil', 'https://restcountries.com/v3.1/alpha/br', 'BR'),
('Espanha', 'https://restcountries.com/v3.1/alpha/es', 'ES'),
('França', 'https://restcountries.com/v3.1/alpha/fr', 'FR'),
('Alemanha', 'https://restcountries.com/v3.1/alpha/de', 'DE'),
('Itália', 'https://restcountries.com/v3.1/alpha/it', 'IT'),
('Reino Unido', 'https://restcountries.com/v3.1/alpha/gb', 'GB'),
('Argentina', 'https://restcountries.com/v3.1/alpha/ar', 'AR'),
('Estados Unidos', 'https://restcountries.com/v3.1/alpha/us', 'US'),
('Canadá', 'https://restcountries.com/v3.1/alpha/ca', 'CA'),
('México', 'https://restcountries.com/v3.1/alpha/mx', 'MX'),
('Chile', 'https://restcountries.com/v3.1/alpha/cl', 'CL'),
('Colômbia', 'https://restcountries.com/v3.1/alpha/co', 'CO'),
('Japão', 'https://restcountries.com/v3.1/alpha/jp', 'JP'),
('China', 'https://restcountries.com/v3.1/alpha/cn', 'CN'),
('Índia', 'https://restcountries.com/v3.1/alpha/in', 'IN'),
('Rússia', 'https://restcountries.com/v3.1/alpha/ru', 'RU'),
('Austrália', 'https://restcountries.com/v3.1/alpha/au', 'AU'),
('Nova Zelândia', 'https://restcountries.com/v3.1/alpha/nz', 'NZ'),
('África do Sul', 'https://restcountries.com/v3.1/alpha/za', 'ZA'),
('Egito', 'https://restcountries.com/v3.1/alpha/eg', 'EG'),
('Turquia', 'https://restcountries.com/v3.1/alpha/tr', 'TR'),
('Coreia do Sul', 'https://restcountries.com/v3.1/alpha/kr', 'KR'),
('Holanda', 'https://restcountries.com/v3.1/alpha/nl', 'NL'),
('Bélgica', 'https://restcountries.com/v3.1/alpha/be', 'BE'),
('Suécia', 'https://restcountries.com/v3.1/alpha/se', 'SE'),
('Noruega', 'https://restcountries.com/v3.1/alpha/no', 'NO'),
('Dinamarca', 'https://restcountries.com/v3.1/alpha/dk', 'DK'),
('Finlândia', 'https://restcountries.com/v3.1/alpha/fi', 'FI'),
('Suíça', 'https://restcountries.com/v3.1/alpha/ch', 'CH'),
('Áustria', 'https://restcountries.com/v3.1/alpha/at', 'AT'),
('Grécia', 'https://restcountries.com/v3.1/alpha/gr', 'GR'),
('Polônia', 'https://restcountries.com/v3.1/alpha/pl', 'PL'),
('Ucrânia', 'https://restcountries.com/v3.1/alpha/ua', 'UA'),
('Roménia', 'https://restcountries.com/v3.1/alpha/ro', 'RO'),
('Hungria', 'https://restcountries.com/v3.1/alpha/hu', 'HU'),
('República Checa', 'https://restcountries.com/v3.1/alpha/cz', 'CZ'),
('Eslováquia', 'https://restcountries.com/v3.1/alpha/sk', 'SK'),
('Croácia', 'https://restcountries.com/v3.1/alpha/hr', 'HR'),
('Sérvia', 'https://restcountries.com/v3.1/alpha/rs', 'RS'),
('Bulgária', 'https://restcountries.com/v3.1/alpha/bg', 'BG'),
('Lituânia', 'https://restcountries.com/v3.1/alpha/lt', 'LT'),
('Letónia', 'https://restcountries.com/v3.1/alpha/lv', 'LV'),
('Estónia', 'https://restcountries.com/v3.1/alpha/ee', 'EE'),
('Israel', 'https://restcountries.com/v3.1/alpha/il', 'IL'),
('Arábia Saudita', 'https://restcountries.com/v3.1/alpha/sa', 'SA'),
('Irão', 'https://restcountries.com/v3.1/alpha/ir', 'IR'),
('Paquistão', 'https://restcountries.com/v3.1/alpha/pk', 'PK'),
('Indonésia', 'https://restcountries.com/v3.1/alpha/id', 'ID'),
('Filipinas', 'https://restcountries.com/v3.1/alpha/ph', 'PH');


INSERT INTO atleta (id_clube, id_escalao, id_statusatleta, nome, datanascimento, ratingfinal, ratinggeral, nomeencarregado, contactoencarregado) VALUES
-- SUB-14 (Born in 2011)
(1, 11, 1, 'António Soares', '2011-03-15', 4, 3.5, 'Manuel Soares', '912345678'),      
(1, 11, 1, 'Miguel Costa', '2011-05-22', 3, 2.8, 'José Costa', '923456789'),            
(1, 11, 1, 'Mauro Pinto', '2011-12-03', 5, 3.8, 'Joana Pinto', '913456789'),          
(2, 11, 1, 'Ricardo Santos', '2011-04-10', 5, 4.0, 'Ana Santos', '934567890'),          
(2, 11, 1, 'João Oliveira', '2011-06-18', 4, 3.2, 'Paulo Oliveira', '945678901'),      
(2, 11, 1, 'André Martins', '2011-02-28', 3, 2.5, 'Sofia Martins', '956789012'),       
(3, 11, 1, 'Diogo Fernandes', '2011-07-05', 2, 1.8, 'Carlos Fernandes', '967890123'),  
(3, 11, 1, 'Tiago Ferreira', '2011-01-20', 4, 3.7, 'Rita Ferreira', '978901234'),      
(4, 11, 1, 'Bruno Carvalho', '2011-08-12', 3, 2.7, 'Pedro Carvalho', '989012345'),     
(4, 11, 1, 'Rui Almeida', '2011-09-30', 4, 3.8, 'Maria Almeida', '990123456'),         
(4, 11, 1, 'Francisco Lima', '2011-11-25', 3, 2.9, 'António Lima', '901234567'),
(5, 11, 1, 'Leonardo Martins', '2011-06-18', 4, 3.4, 'Paulo Martins', '915667788'),
(5, 11, 1, 'Gabriel Ferreira', '2011-09-05', 3, 2.7, 'Ana Ferreira', '919223344'),

-- SUB-5 (Born in 2020) 
(6, 2, 1, 'João Figueiredo', '2020-05-12', 3, 2.3, 'Pedro Figueiredo', '911223344'),

-- SUB-7 (Born in 2018)
(7, 4, 1, 'Miguel Rocha', '2018-08-24', 4, 3.1, 'Ana Rocha', '919876543'),
(9, 4, 1, 'Tomás Duarte', '2018-01-15', 2, 1.5, 'José Duarte', '935223344'),
(10, 4, 1, 'Luís Tavares', '2018-11-29', 5, 4.0, 'Fátima Tavares', '918332244'),

-- SUB-9 (Born in 2016)
(7, 6, 1, 'André Matos', '2016-02-10', 4, 3.5, 'Rui Matos', '935667788'),
(8, 6, 1, 'Tiago Ferreira', '2016-11-18', 3, 2.4, 'Sofia Ferreira', '918223344'),

-- SUB-10 (Born in 2015)
(6, 7, 1, 'Carlos Mendes', '2015-07-05', 5, 4.0, 'Jorge Mendes', '936554433'),
(8, 7, 1, 'Rafael Silva', '2015-01-27', 2, 1.7, 'Mariana Silva', '912334455'),
(9, 7, 1, 'Filipe Correia', '2015-09-30', 3, 2.8, 'José Correia', '917223399'),

-- SUB-12 (Born in 2013)
(10, 9, 1, 'Diogo Almeida', '2013-09-15', 4, 3.2, 'Helena Almeida', '917665544'),

-- SUB-15 (Born in 2010)
(7, 12, 1, 'Nuno Rodrigues', '2010-03-11', 3, 2.9, 'José Rodrigues', '913344556'),
(8, 12, 1, 'Gonçalo Costa', '2010-12-30', 5, 4.0, 'Carla Costa', '916778899'),

-- SUB-17 (Born in 2008)
(6, 14, 1, 'Fábio Oliveira', '2008-08-14', 4, 3.6, 'Luís Oliveira', '917889900'),
(10, 14, 1, 'Pedro Cardoso', '2008-04-03', 3, 2.5, 'Joana Cardoso', '919443322'),
(7, 14, 1, 'Rodrigo Pinto', '2008-11-21', 2, 1.2, 'Sérgio Pinto', '914332211'),
(9, 14, 1, 'Hugo Nunes', '2008-05-07', 5, 4.0, 'Paulo Nunes', '918889900'),

-- SUB-19 (Born in 2006)
(8, 16, 1, 'Ricardo Lopes', '2006-02-28', 5, 4.0, 'Sandra Lopes', '914556677'),

-- SUB-20 (Born in 2005)
(7, 17, 1, 'Manuel Teixeira', '2005-06-22', 4, 3.7, 'Carlos Teixeira', '917665588'),
(10, 17, 1, 'Bruno Fonseca', '2005-10-30', 2, 1.5, 'Sónia Fonseca', '913332244');  

INSERT INTO equipa (id_tipoequipa, id_escalao, id_divisao) VALUES
(1, 11, 1), 
(2, 11, 1); 

INSERT INTO equipaatleta (id_equipa, id_atleta, posicaoformacao) VALUES
(1, 1, 1),  
(1, 2, 4),
(1, 3, 9),
(1, 4, 4),
(1, 5, 8),
(1, 6, 9),
(1, 7, 14),
(1, 8, 15),
(1, 9, 16),
(1, 10, 17),
(1, 11, 9);

INSERT INTO jogo (id_escalao, data) VALUES
(11, '2025-02-01 15:00:00'),  -- Porto Benfica - Jogo em Fevereiro
(11, '2025-02-07 16:30:00'),  -- Sporting Braga - Jogo nos útlimos 7 dias
(11, '2025-02-08 14:30:00'),  --  - Jogo nos útlimos 7 dias
(11, '2025-02-11 16:20:00'),  --  - Jogo nos útlimos 7 dias
(11, '2025-02-12 19:50:00'),  --  - Jogo nos próximos 7 dias
(11, '2025-03-02 20:00:00');  --  - Jogo em março

INSERT INTO jogoclube (id_jogo, id_clube) VALUES
(1, 1),  -- PORTO benfica
(1, 2),  -- porto BENFICA
(2, 3),  -- SPORTING braga
(2, 4),  -- sporting BRAGA
(3, 2), -- BENFICA vitoria - RELATORIOS
(3, 5), -- benfica VITORIA - RELATORIOS
(4, 3), -- SPORTING porto - RELATORIOS
(4, 1), -- PORTO sporting - RELATORIOS
(5, 2), -- BENFICA braga
(5, 4), -- braga BENFICA
(6, 2), -- BENFICA vitoria
(6, 5); -- benfica VITORIA

INSERT INTO jogoatleta (id_jogo, id_atleta) VALUES
(1, 1), (1, 2), (1, 3),  -- PORTO
(1, 4), (1, 5), (1, 6),  -- BENFICA
(2, 7), (2, 8),  -- SPORTING
(2, 9), (2, 10), (2, 11), -- BRAGA
(3, 4), (3, 5), (3, 6),  -- BENFICA
(3, 12), (3, 13), -- VITORIA 
(4, 7), (4, 8),  -- SPORTING
(4, 1), (4, 2), (4, 3),  -- PORTO
(5, 4), (5, 5), (5, 6),  -- BENFICA
(5, 9), (5, 10), (5, 11), -- BRAGA
(6, 4), (6, 5), (6, 6),  -- BENFICA
(6, 12), (6, 13); -- VITORIA 



INSERT INTO nacionalidadeatleta (id_nacionalidade, id_atleta) VALUES -- Atualizar para as novas nacionalidades
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(2, 7), (2, 8),
(3, 9), (3, 10),
(1, 11),
(1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18), (1, 19), (1, 20), (1, 21),
(1, 22), (1, 23), (1, 24), (1, 25), (1, 26), (1, 27), (1, 28), (1, 29), (1, 30), (1, 31),
(1, 32),

-- Some Nacionalidade 2
(2, 15), (2, 19), (2, 22), (2, 26), (2, 28), (2, 31),

-- Rarely Nacionalidade 3
(3, 17), (3, 23), (3, 29),

-- Some with dual nationality (1 and 2)
(2, 16),
(2, 21),
(2, 27),

-- Some with dual nationality (1 and 3)
(3, 30);


INSERT INTO posicaoatleta (id_posicao, id_atleta) VALUES -- Atualizar para os novos atletas
(1, 1), 
(4, 2),  
(11, 3), 
(4, 4),  
(8, 5), 
(9, 6),  
(14, 7), 
(15, 8), 
(16, 9), 
(17, 10), 
(9, 11),

-- Guarda-Redes (GR)
(4, 12), 
(4, 13), 
(4, 14), 

-- Defesas (DC, DD, DE, LD, LE)
(3, 15), (4, 15), -- DC + DC
(3, 16), (5, 16), -- DC + DD
(5, 17), (6, 17), -- DD + DE
(3, 18),          -- DC
(5, 19),          -- DD
(6, 20), (4, 20), -- DE + DC

-- Médios (MC, MD, ME, MCD, MCO, MEO, MDO)
(8, 21), (9, 21), -- ME + MC
(7, 22),          -- MD
(9, 23), (10, 23), -- MC + MCD
(8, 24),          -- ME
(9, 25), (7, 25), -- MC + MD
(10, 26),         -- MCD
(12, 27), (13, 27), -- MEO + MDO
(9, 28),          -- MC
(10, 29),         -- MCD
(11, 30), (12, 30), -- MCO + MEO

-- Avançados (ED, EE, SA, PL)
(14, 31), (15, 31), -- ED + EE
(14, 32), (15, 32); -- ED + EE


INSERT INTO utilizador (id_tipoutilizador, nome, email, password, telefone) VALUES -- Estes utilizadores nunca vão ser utilizados, é só para demonstração PRECISA DE CRIAR UM ADMIN APÓS ISTO PARA TESTES DO BACKOFFICE
(1, 'João Silva', 'joao.scout@email.com', 'hash123', '911222333'),
(1, 'Ana Pereira', 'ana.scout@email.com', 'hash789', '916777888'),
(3, 'Maria Santos', 'maria.guest@email.com', 'hash456', '922333444'),
(3, 'Pedro Costa', 'pedro.guest@email.com', 'hash789', '933444555');

INSERT INTO utilizadorjogo (id_utilizador, id_jogo, id_atleta) VALUES 
(1, 1, 1),
(1, 1, 2),
(1, 1, 3),
(1, 1, 4),
(1, 1, 5),
(1, 1, 6),
(2, 2, 7),
(2, 2, 8),
(2, 2, 9),
(2, 2, 10),
(2, 2, 11),
(1, 3, 4),
(1, 3, 5),
(1, 3, 6),
(1, 3, 12),
(1, 3, 13),
(2, 4, 7),
(2, 4, 8),
(2, 4, 1),
(2, 4, 2),
(2, 4, 3),
(1, 5, 4),
(1, 5, 5),
(1, 5, 6),
(1, 5, 9),
(1, 5, 10),
(1, 5, 11),
(2, 6, 4),
(2, 6, 5),
(2, 6, 6),
(2, 6, 12),
(2, 6, 13);



INSERT INTO relatorio ( id_utilizador, id_jogo, id_atleta, tecnica, velocidade, atitudecompetitiva, inteligencia, altura, morfologia, apontamentos, data
) VALUES 
(1, 1, 3, 3, 4, 2, 3, 1.70, 'Ectomorfo', 'Bom controle de bola', '2025-01-01'),
(1, 1, 3, 3, 3, 3, 3, 1.70, 'Ectomorfo', 'Ótimo desempenho', '2025-02-02'),
(1, 1, 3, 3, 3, 3, 4, 1.70, 'Ectomorfo', 'Ágil e técnico',  '2025-03-03'),
(1, 1, 3, 4, 3, 3, 3, 1.70, 'Ectomorfo', 'Resistente', '2025-04-04'),
(1, 1, 3, 4, 4, 2, 3, 1.70, 'Ectomorfo', 'Ótima atuação defensiva', '2025-05-05'),
(1, 1, 3, 4, 3, 3, 3, 1.70, 'Ectomorfo', 'Explosivo', '2025-06-06'),
(1, 1, 3, 3, 4, 3, 3, 1.70, 'Ectomorfo', 'Rápido e técnico', '2025-07-07'),
(1, 1, 3, 4, 3, 3, 3, 1.70, 'Ectomorfo', 'Tático', '2025-08-08'),
(1, 1, 3, 4, 3, 3, 3, 1.70, 'Ectomorfo', 'Bom passe', '2025-09-09'),
(1, 1, 3, 3, 4, 3, 3, 1.70, 'Ectomorfo', 'Criativo', '2025-10-10'),
(1, 1, 3, 3, 3, 3, 3, 1.70, 'Ectomorfo', 'Jogador técnico',  '2025-11-11'),
(1, 1, 3, 3, 3, 3, 3, 1.70, 'Ectomorfo', 'Físico forte', '2025-12-12');


INSERT INTO notificacoes (id_utilizador, data, texto) VALUES
(1, '2025-01-15 16:00:00', 'Relatório pendente para o jogo FC Porto vs SL Benfica'),
(2, '2025-01-20 17:30:00', 'Novo jogo adicionado ao sistema'),
(3, '2025-01-20 18:00:00', 'Bem-vindo ao sistema de scouting');

    `;
    await sequelize.query(query1);
    await sequelize.query(query2);
    const hashedPassword = await bcrypt.hash('admin', 10);
    await models.utilizador.create({
        nome: 'Admin',
        email: 'admin@admin.admin',
        password: hashedPassword,
        telefone: '912345678',
        id_tipoutilizador: 2,
    });
    return res.status(200).json({
        success: true,
        message: 'Funcionou'
    });
});
*/

// Routers
app.use('/', homeRouter);
app.use('/', equipasRouter);
app.use('/jogo', jogoRouter);
app.use('/atleta', atletaRouter);
app.use('/relatorio', relatorioRouter);
app.use('/utilizador', utilizadorRouter);
app.use('/clube', clubeRouter);
app.use('/escalao', escalaoRouter);
app.use('/auth', authRouter);
app.use('/mobile', mobileSync); // Registrando authRouter
/* app.use('/tipoEquipa', tipoEquipasRouter); */



// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
