const express = require('express');
const homeRouter = require('./routes/home.js');
const equipasRouter = require('./routes/equipas.js');
const jogoRouter = require('./routes/jogoRoute.js');
const cors = require('cors');
/* const  tipoEquipasRouter = require('./routes/tipoEquipas.js'); */
const app = express();

const port = 8080;

//Configurações
app.set('port', process.env.PORT || 8080);
//Middlewares
app.use(express.json());

// Enable CORS for all origins
app.use(cors());


//Routers
app.use('/', homeRouter);
app.use('/equipa', equipasRouter);
app.use('/jogo', jogoRouter);
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