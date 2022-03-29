const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res) => {
    res.send('Você está no main');
})

router.post('/request', (req, res, next) => {
    const token = req.body.token;
    const lat = req.body.lat;
    const long = req.body.long;

    console.log(token, lat, long);

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO main (token, latitude, longitude) VALUES (?,?,?)',
            [token, lat, long],
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Funcionou!'
                })

            }

        )
    })
})


router.post('/response', (req, res) => {
    const token = req.body.token;

    console.log(token);

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM main WHERE token = ?;',
            [token],
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                console.log(resultado[0] == undefined);

                if(resultado[0] != undefined){
                    res.send({lat: resultado[0].latitude, long: resultado[0].longitude});
                } else { 
                    res.send({message: "Não encontrado"});
                }

            }

        )
    })
})



module.exports = router;