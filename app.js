const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


const rotaInit = require('./routes/init');
const rotaMain = require('./routes/main');

app.get('/', (req, res) => {
    res.send("Caminho encontrado");
})

app.use('/init', rotaInit);
app.use('/main', rotaMain);


module.exports = app;