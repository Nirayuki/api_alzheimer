const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
require('dotenv').config()



router.post('/', (req, res, next) => {

    const email = req.body.email;
    const senha = req.body.senha;

    var idUsuario;

    const data = {
        idUsuario: 0,
        TIPO_CUIDADOR_PACIENTE: 0,
        Email: 0,
        Senha: 0
    }

    getDataCuidador = (resultado, result) => {
        data.idCuidador = resultado[0].idCuidador;
        data.idUsuario = resultado[0].idUsuario;
        data.TIPO_CUIDADOR_PACIENTE = resultado[0].TIPO_CUIDADOR_PACIENTE;
        data.Email = resultado[0].Email;
        data.Senha = resultado[0].Senha;
    }

    getDataPaciente = (resultado, result) => {
        data.idPaciente = resultado[0].idPaciente;
        data.idUsuario = resultado[0].idUsuario;
        data.TIPO_CUIDADOR_PACIENTE = resultado[0].TIPO_CUIDADOR_PACIENTE;
        data.Email = resultado[0].Email;
        data.Senha = resultado[0].Senha;
    }

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Usuario WHERE Email = ?;',
            email,
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    res.send({ error: error});
                }

                idUsuario = resultado[0].idUsuario;

                if(resultado.length > 0) {
                    bcrypt.compare(senha, resultado[0].Senha, (error, response) => {
                        if (response) {
                            

                            if(resultado[0].TIPO_CUIDADOR_PACIENTE == 2){
                                conn.query(
                                    'SELECT idCuidador FROM Cuidador WHERE idUsuario = ?',
                                    idUsuario,
                                    (error, result, field) => {
                                        conn.release();
                                        if (error) {
                                            res.send({ error: error});
                                        }
                
                                        getDataCuidador(resultado, result[0].idCuidador);
                
                                        res.send({data: data});
                                    }
                                ) 
                            }else{
                                conn.query(
                                    'SELECT idPaciente FROM Paciente WHERE idUsuario = ?',
                                    idUsuario,
                                    (error, result, field) => {
                                        conn.release();
                                        if (error) {
                                            res.send({ error: error});
                                        }
                
                                        getDataPaciente(resultado, result[0].idPaciente);
                
                                        res.send({data: data});
                                    }
                                ) 
                            }
                            
                        } else {
                            res.send({message: "Login Incorreto"});
                        }
                    })
                } else {
                    res.send({auth: false, message: "Email doesn't exist"});
                }
            }
        )
    })
});


module.exports = router;
