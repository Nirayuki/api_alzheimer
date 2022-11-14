const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt')
const saltRounds = 10

router.post('/register', (req, res, next) => {

    const idCuidador = req.body.idCuidador;
    const nome = req.body.nome;
    const data_nascimento = req.body.data_nascimento;
    const doenca = req.body.doenca;
    const observacoes = req.body.observacoes;

    const senha = req.body.senha;
    const email = req.body.email;
    const tipo_cuidador = req.body.tipo_cuidador;


    var UsuarioID;

    mysql.getConnection((error, conn) => {
        bcrypt.hash(senha, saltRounds, (err, hash) => {

            if(err) {
                console.log(err)
            }

            conn.query(
                'INSERT INTO Usuario (TIPO_CUIDADOR_PACIENTE, Email, Senha) VALUES (?,?,?)',
               [tipo_cuidador , email, hash],
                (error, resultado, field) => {
   
                    conn.release();

                    UsuarioID = resultado.insertId
   
                    if (error) {
                       res.status(500).send({
                           error: error,
                           response: null
                        });
                    }

                    conn.query(
                        'INSERT INTO Paciente (idUsuario, idCuidador, Nome, Data_Nascimento, Doenca, Observacoes) VALUES (?,?,?,?,?,?)',
                        [UsuarioID, idCuidador, nome, data_nascimento, doenca, observacoes],
                        (error, resultado, field) => {
                
                            conn.release();
            
                            if (error) {
                                res.status(500).send({
                                    error: error,
                                    response: null
                                });
                            }
            
                            res.status(201).send({
                                mensagem: 'Paciente cadastrado com sucesso!'
                            })
            
                        }
            
                    )
   
               }
           )
   
       }) 



        
    })
});


router.post('/consulta', (req, res, next) => {

    const idUsuario = req.body.idUsuario;

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Paciente WHERE idUsuario = ?',
            idUsuario,
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

    const idPaciente = req.body.idPaciente;

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Paciente WHERE idPaciente = ?',
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



router.post('/edit', (req, res, next) => {

    const idPaciente = req.body.idPaciente;
    const nome = req.body.nome;
    const data_nascimento = req.body.data_nascimento;
    const doenca = req.body.doenca;
    const observacoes = req.body.observacoes;


    mysql.getConnection((error, conn) => {
        conn.query(
            'UPDATE Paciente SET Nome=?, Data_Nascimento=?, Doenca=?, Observacoes=? WHERE idPaciente = ?',
            [nome, data_nascimento, doenca, observacoes, idPaciente],
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Paciente atualizado com sucesso!'
                })

            }

        )
    })
});


router.post('/delete', (req, res, next) => {

    const idPaciente = req.body.idPaciente;

    var idUsuario;

    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM Paciente WHERE idPaciente = ?',
            idPaciente,
            (error, resultado, field) => {
    
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                conn.query(
                    'DELETE FROM Remedio WHERE idPaciente = ?',
                    idPaciente,
                    (error, resultado, field) => {
            
                        conn.release();
        
                        if (error) {
                            res.status(500).send({
                                error: error,
                                response: null
                            });
                        }
        
                    }
        
                )

                conn.query(
                    'DELETE FROM Familia WHERE idPaciente = ?',
                    idPaciente,
                    (error, resultado, field) => {
            
                        conn.release();
        
                        if (error) {
                            res.status(500).send({
                                error: error,
                                response: null
                            });
                        }
        
                    }
        
                )

                conn.query(
                    'SELECT * FROM Paciente WHERE idPaciente = ?',
                     idPaciente,
                    (error, resultado, field) => {
            
                        conn.release();
                        
                        idUsuario = resultado.idUsuario;
        
                        if (error) {
                            res.status(500).send({
                                error: error,
                                response: null
                            });
                        }

                        conn.query(
                            'DELETE FROM Usuario WHERE idUsuario = ?',
                             idUsuario,
                            (error, resultado, field) => {
                    
                                conn.release();
                
                                if (error) {
                                    res.status(500).send({
                                        error: error,
                                        response: null
                                    });
                                }
                
                            }
                
                        )
        
                    }
        
                )

                res.status(201).send({
                    mensagem: 'Paciente deletado com sucesso!'
                })

            }

        )
    })
});


module.exports = router;
