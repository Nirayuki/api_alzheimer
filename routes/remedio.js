const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/register', (req, res, next) => {

    const idPaciente = req.body.idPaciente;
    const nomeRedio = req.body.nomeRedio;
    const dosagem = req.body.dosagem;
    const diasDuracao = req.body.diasDuracao;
    const horario1 = req.body.horario1;
    const horario2 = req.body.horario2;
    const horario3 = req.body.horario3;
    const horario4 = req.body.horario4;

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Remedio (idPaciente, NomeRedio, Dosagem, DiasDuracao, horario1, horario2, horario3, horario4) VALUES (?,?,?,?,?,?,?,?)',
            [idPaciente, nomeRedio, dosagem, diasDuracao, horario1, horario2, horario3, horario4],
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
    const horario1 = req.body.horario1;
    const horario2 = req.body.horario2;
    const horario3 = req.body.horario3;
    const horario4 = req.body.horario4;


    mysql.getConnection((error, conn) => {
        conn.query(
            'UPDATE Familia SET NomeRedio=?, Dosagem=?, DiasDuracao=?, horario1=?, horario2=?, horario3=?, horario4=?,  WHERE idRemedios = ?',
            [nomeRedio, dosagem, diasDuracao, idRemedios, horario1, horario2, horario3, horario4],
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
