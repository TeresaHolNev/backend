var express = require('express');
var bcryptjs = require('bcryptjs');

var Usuario = require('../models/usuario.js');

var app = express();

app.get('/', (req, res, next)=>{
    
    Usuario.find({}).exec((err, usuarios)=>{ //Para que nos busque todos los usuarios
        if (err)    //Si hubiera un error
            return res.status(500).json({
                ok:false,
                mensaje:'Error acceso DB',
                errores: err
            })
        res.status(200).json({
            ok: true,
            usuarios: usuarios
        });        
    });

});

app.post('/', function(req,res,next){
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs.hashSync(body.password,10),
        rol: body.rol//Modelo de autorizaciones
    });

    usuario.save((err,datos)=>{
        if (err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear el usuario',
                errores: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Usuario creado correctamente'
        });

    });
});

app.put('/:id', (req, resp, next)=>{

    var body = req.body;

    Usuario.findById(req.params.id, (err,usuario)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error de conexión'
            })
        }
    usuario.nombre = body.nombre;
    usuario.email = body.email;
    usuario.rol = body.rol;

    usuario.save((err, usuarioModificado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al actualizar el usuario',
                errores: err
            })
        }
        resp.status(200).json({
            ok:true,
            mensaje:'Usuario actualizado correctamente',
        })
    })

    })
});

app.delete('/:id', function(req, res, error){

    Usuario.findByIdAndRemove(req.params.id, function(err, datos){
        if(err) return next (err);
        res.status(200).json({
            ok:true,
            mensaje:'Usuario eliminado'
        });
    });
});

module.exports = app;