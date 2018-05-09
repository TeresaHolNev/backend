var express = require('express');
var mongoose = require('mongoose');

var Proveedor = require('../models/proveedor.js');
var autentoken = require('../middleware/autentoken');

var app = express();

app.get('/', (req, res, next) => {

    var desde = req.query.desde;
    desde = Number(desde);

    Proveedor.find({}).skip(desde).limit(5).exec((err, proveedores)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }

        Proveedor.count({}, (err, totales)=>{
            res.status(200).json({
                ok: true,
                proveedores: proveedores,
                totales: totales
            })
        })


    });

});

app.get('/:id', function(req, res, next){
    
    Proveedor.findById(req.params.id, (err, proveedor)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            proveedor: proveedor
        })
    })  
});


app.post('/', (req, res, next)=>{
    
    var body = req.body;

    var proveedor = new Proveedor({
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto
    });

    proveedor.save((err, proveedorGuardado)=>{
        
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el proveedor',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            proveedor: proveedorGuardado
        })
    });


});

app.put('/:id', function(req, res, next){

    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Proveedor actualizado'
        });
    });

});

app.delete('/:id', autentoken.verificarToken ,function(req, res, error){

    Proveedor.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Proveedor ' + datos.nombre + ' eliminado';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        }); 
    })

});

module.exports = app;