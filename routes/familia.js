const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/register', (req, res, next) => {

    const idPaciente = req.body.idPaciente;
    const nome = req.body.nome;
    const parentesco = req.body.parentesco;
    const data_nascimento = req.body.data_nascimento;
    const telefone = req.body.telefone;
    const IMGFotoFamiliar = req.body.IMGFotoFamiliar;


    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Familia (idPaciente, Nome, Parentesco, DataNascimento, Telefone, IMGFotoFamiliar) VALUES (?,?,?,?,?,?)',
            [idPaciente, nome, parentesco, data_nascimento, telefone, IMGFotoFamiliar],
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Familiar criado com sucesso!'
                })

            }

        )
    })
});


router.post('/consulta', (req, res, next) => {

    const idPaciente = req.body.idPaciente;

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Familia WHERE idPaciente = ?',
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

    const idFamilia = req.body.idFamilia;

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Familia WHERE idFamilia = ?',
            idFamilia,
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

    const idFamilia = req.body.idFamilia;
    const nome = req.body.nome;
    const dataNascimento = req.body.dataNascimento;
    const telefone = req.body.telefone;
    const parentesco = req.body.parentesco;
    const IMGFotoFamiliar = req.body.IMGFotoFamiliar;


    mysql.getConnection((error, conn) => {
        conn.query(
            'UPDATE Familia SET Nome=?, Parentesco=?,DataNascimento=?, Telefone=?, IMGFotoFamiliar=? WHERE idFamilia = ?',
            [nome, parentesco, dataNascimento, telefone, IMGFotoFamiliar, idFamilia],
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Familiar atualizado com sucesso!'
                })

            }

        )
    })
});

module.exports = router;
