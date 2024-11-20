const express = require('express');
const homeRouter = require('./src/routes/home');
const equipasRouter = require('./src/routes/equipas');

const app = express();

const port = 3000;

//Configurações
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(express.json());

//Routers
app.use('/', homeRouter);
app.use('/equipa', equipasRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});