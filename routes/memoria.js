const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
require('dotenv').config()

router.get('/', (req, res, next) => {
    res.status(201).send({mensagem: "Caminho encontrado"});
})

router.post('/register', (req, res, next) => {

    const idPaciente = req.body.idPaciente;
    const nome = req.body.nome;
    const data = req.body.data;
    const anotacao = req.body.anotacao;

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Memoria (idPaciente, Nome, Data, Anotacao) VALUES (?,?,?,?)',
            [idPaciente, nome, data, anotacao],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Memoria criada com sucesso!'
                })
            }
        )
    })
});


router.post('/consulta', (req, res, next) => {

    const idPaciente = req.body.idPaciente;

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Memoria WHERE idPaciente = ?',
            idPaciente,
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.send(resultado);

            }

        )
    })
});


router.post('/get', (req, res, next) => {

    const idMemoria = req.body.idMemoria;

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Memoria WHERE idMemoria = ?',
            idMemoria,
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.send(resultado);

            }

        )
    })
});



router.put('/edit', (req, res, next) => {

    const idMemoria = req.body.idMemoria;
    const nome = req.body.nome;
    const data = req.body.data;
    const anotacao = req.body.anotacao;


    mysql.getConnection((error, conn) => {
        conn.query(
            'UPDATE Memoria SET Nome=?, Data=?, Anotacao=? WHERE idMemoria = ?',
            [nome, data, anotacao, idMemoria],
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Memoria atualizada com sucesso!'
                })

            }

        )
    })
});


router.post('/delete', (req, res, next) => {

    const idMemoria = req.body.idMemoria;

    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM Memoria WHERE idMemoria = ?',
            idMemoria,
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Memoria removida com sucesso!'
                })

            }

        )
    })
});

module.exports = router;