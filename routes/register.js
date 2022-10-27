const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt')
const saltRounds = 10

router.post('/', (req, res, next) => {
    const senha = req.body.senha;
    const email = req.body.email;
    const tipo_cuidador = req.body.tipo_cuidador;

    var idUsuario;

    if(tipo_cuidador == 1){
        mysql.getConnection((error, conn) => {
            bcrypt.hash(senha, saltRounds, (err, hash) => {
                console.log(hash)
    
                if(err) {
                    console.log(err)
                }
    
                conn.query(
                    'INSERT INTO usuario (TIPO_CUIDADOR_PACIENTE, Email, Senha) VALUES (?,?,?)',
                   [tipo_cuidador , email, hash],
                    (error, resultado, field) => {
        
                        conn.release();
        
                        if (error) {
                            res.status(500).send({
                                error: error,
                                response: null
                            });
                        }
    
                        res.status(201).send({
                            mensagem: 'Registro feito com sucesso'
                        })
        
                    }
                )
        
            }) 
        })
    }


    if(tipo_cuidador == 2){
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

                        idUsuario = resultado.insertId

                        console.log(resultado);

                        if (error) {
                            res.status(500).send({
                                error: error,
                                response: null
                            });
                        }
    
                        // res.status(201).send({
                        //     mensagem: 'Registro feito com sucesso'
                        // })

                        conn.query(
                            'INSERT INTO Cuidador (idUsuario, Nome, Data_Nascimento) VALUES (?,"","00-00-0000")',
                           [idUsuario],
                            (error, resultado, field) => {
                
                                conn.release();
        
                                if (error) {
                                    res.status(500).send({
                                        error: error,
                                        response: null
                                    });
                                }
            
                                res.status(201).send({
                                    mensagem: 'Registro feito com sucesso o cuidador'
                                })
                
                            }
                        )
                
        
                    }
                )


               
            }) 
        })
    }

    
});

module.exports = router;
