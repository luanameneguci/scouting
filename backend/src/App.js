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
/* const tipoEquipasRouter = require('./routes/tipoEquipas.js'); */

const app = express();
const port = 8080;

// Configurações
app.set('port', process.env.PORT || 8080);


// Middlewares
app.use(cors({ origin: '*' })); // Apply CORS globally


// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// Adicionar logs para depuração (ponto 1)
app.use((req, res, next) => {
    console.log("Requisição recebida:", {
        method: req.method,
        url: req.url,
        body: req.body,
        headers: req.headers,
    });
    next();
});

// Routers
app.use('/', homeRouter);
app.use('/equipa', equipasRouter);
app.use('/jogo', jogoRouter);
app.use('/atleta', atletaRouter); 
app.use('/relatorio', relatorioRouter); 
app.use('/utilizador', utilizadorRouter);
app.use('/auth', authRouter); // Registrando authRouter
/* app.use('/tipoEquipa', tipoEquipasRouter); */



// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
