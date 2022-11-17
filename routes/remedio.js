const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/register', (req, res, next) => {

    const idPaciente = req.body.idPaciente;
    const nomeRedio = req.body.nomeRedio;
    const dosagem = req.body.dosagem;
    const horario = req.body.horario;
    const observacao = req.body.observacao;

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Remedio (idPaciente, NomeRedio, Dosagem, Horario, Observacao) VALUES (?,?,?,?,?)',
            [idPaciente, nomeRedio, dosagem, horario, observacao],
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Remedio criado com sucesso!'
                })
  
            }

        )
    })
});


router.post('/consulta', (req, res, next) => {

    const idPaciente = req.body.idPaciente;

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Remedio WHERE idPaciente = ?',
            idPaciente,
            (error, resultado, field) => {
    
                conn.release();

                // resultadoRemedio = resultado;

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

    const idRemedios = req.body.idRemedios;

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Remedio WHERE idRemedios = ?',
            idRemedios,
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

    const idRemedios = req.body.idRemedios;
    const nomeRedio = req.body.nomeRedio;
    const dosagem = req.body.dosagem;
    const diasDuracao = req.body.diasDuracao;
    const horario = req.body.horario;
    const observacao = req.body.observacao;


    mysql.getConnection((error, conn) => {
        conn.query(
            'UPDATE Remedio SET NomeRedio=?, Dosagem=?, Horario=?, Observacao=? WHERE idRemedios = ?',
            [nomeRedio, dosagem, diasDuracao, horario, observacao, idRemedios],
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Remedios atualizado com sucesso!'
                })

            }

        )
    })
});


router.post('/delete', (req, res, next) => {

    const idRemedios = req.body.idRemedios;

    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM Remedios WHERE idRemedios = ?',
            idRemedios,
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Remedio removido com sucesso!'
                })

            }

        )
    })
});

module.exports = router;
