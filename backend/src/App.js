const express = require('express');
const homeRouter = require('./routes/home.js');
const equipasRouter = require('./routes/equipas.js');
const jogoRouter = require('./routes/jogoRoute.js');
const atletaRouter = require('./routes/atletaRoute.js'); 
/* const  tipoEquipasRouter = require('./routes/tipoEquipas.js'); */
const app = express();

const port = 8080;

// Configurações
app.set('port', process.env.PORT || 8080);

// Middlewares: express.json() apenas para POST, PUT, etc.
app.use((req, res, next) => {
    if (req.method === "GET") {
        return next(); // Ignora express.json() em GET
    }
    express.json()(req, res, next); // Aplica express.json() para outros métodos
});


//Routers
app.use('/', homeRouter);
app.use('/equipa', equipasRouter);
app.use('/jogo', jogoRouter);
app.use('/atleta', atletaRouter); 
/* app.use('/tipoEquipa', tipoEquipasRouter); */

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
    }); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});