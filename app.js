const express = require('express');
require('dotenv').config()

const app = express();

const rotaInit = require('./routes/init');

app.get('/', (req, res) => {
    res.send("Caminho encontrado");
})

app.use('/init', rotaInit);


module.exports = app;