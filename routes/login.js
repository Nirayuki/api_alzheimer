const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
require('dotenv').config()

router.post('/', (req, res, next) => {

    const email = req.body.email;
    const senha = req.body.senha;

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Usuario WHERE Email = ?;',
            email,
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    res.send({ error: error});
                }

                if(resultado.length > 0) {
                    bcrypt.compare(senha, resultado[0].Senha, (error, response) => {

                       
                        if (response) {
                           //const token = jwt.sign({userId: resultado[0].idUsuario}, process.env.ACESS_TOKEN_SECRET)
                           console.log(resultado[0])
                            res.send({data: resultado[0]});
                        } else {
                            res.send({auth: false, message: "Login Incorreto"});
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