const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


const rotaInit = require('./routes/init');
const rotaMain = require('./routes/main');


const rotaRegister = require('./routes/register');
const rotaLogin = require('./routes/login');

const rotaPaciente = require('./routes/paciente');


const rotaFamilia = require('./routes/familia');

const rotaRemedio = require('./routes/remedio');

const rotaMemoria = require('./routes/memoria');

app.get('/', (req, res) => {
    res.send("Caminho encontrado");
})

app.use('/init', rotaInit);
app.use('/main', rotaMain);

app.use('/register', rotaRegister);
app.use('/login', rotaLogin);

app.use('/paciente', rotaPaciente);

app.use('/familia', rotaFamilia);

app.use('/remedio', rotaRemedio);

app.use('/memoria', rotaMemoria);


module.exports = app;