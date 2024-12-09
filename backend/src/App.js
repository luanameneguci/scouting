const express = require('express');
const homeRouter = require('./routes/home.js');
const equipasRouter = require('./routes/equipas.js');
/* const  tipoEquipasRouter = require('./routes/tipoEquipas.js'); */
const app = express();

const port = 8080;

//Configurações
app.set('port', process.env.PORT || 8080);
//Middlewares
app.use(express.json());


//Routers
app.use('/', homeRouter);
app.use('/equipa', equipasRouter);
/* app.use('/tipoEquipa', tipoEquipasRouter); */


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});