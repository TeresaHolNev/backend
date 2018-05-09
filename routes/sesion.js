var express = require('express');
var mongoose = require('mongoose');

var Sesion = require('../models/sesion.js');

var app = express();

app.get('/', (req, res, next) => {

    var nombre = req.query.nombre;

    Sesion.find({nombre:nombre})
          .sort({_id:-1})
          .exec((err, sesiones)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error acceso DB',
                    errores: err
                })
            }
            res.status(200).json({
                ok: true,
                sesiones: sesiones
            })
        });
});

app.post('/', (req, res, next)=>{
    
    var body = req.body;

    var sesion = new Sesion({
        nombre: body.nombre,
        login: body.login,
        logout: body.logout,
        duracion: body.duracion
    });

    sesion.save((err, sesionGuardada)=>{
        
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al registrar sesión',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            sesion: sesionGuardada
        })
    });

});

module.exports = app;


/*

    app.peticionHttp( funcion callback(
        lee el mensaje
        crea el objeto con la clase del modelo mongoose
        objeto.metodoMongoose( funcion callback(
            gestiona la respuesta
        ))
    ) )

*/
