var express = require('express'); //Importamos Express
var mongoose = require('mongoose'); //Importamos mongoose

var Proveedor = require('../Models/proveedor.js'); //Conectamos la ruta con el modelo (se puede poner sin parémtesis)

var app = express();

app.get('/', (req, res, next)=>{
    
    Proveedor.find({}).exec((err, proveedores)=>{ //Para que nos busque todos los proveedores
        if (err)    //Si hubiera un error
            return res.status(500).json({
                ok:false,
                mensaje:'Error acceso DB',
                errores: err
            })
        res.status(200).json({
            ok: true,
            proveedores: proveedores
        });        
    });

});

app.get('/:id', function(req, res, next){
    
    Proveedor.findById(req.params.id, (err, proveedor)=>{
        if (err) {   //Si hubiera un error
            return res.status(500).json({
                ok:false,
                mensaje:'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            proveedor: proveedor
        });   
    });
});

app.post('/', (req,res)=>{

    var body = req.body;   //En el cuerpo de las peticiones res. que hagamos vamos a mandar un json

    var proveedor = new Proveedor({  //Nos creamos la asociación para cada propiedad
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,    
        mail: body.mail,
        contacto: body.contacto,
    })

    proveedor.save((err, proveedorGuardado)=>{    //Guardar en la base de datos las propiedades que le demos
        if(err) {   //Si hay error
            return res.status(400).json({   //conteste con un json
                ok: false,  //De que es falso
                mensaje: 'Error al crear el proveedor', //Con este mensaje
                errores:err //Error sea err
            })
        }
        res.status(200).json({  //si la respuesta es correcta
            ok:true, //Y sea verdadero
            proveedor: proveedorGuardado //conteste el proveedor ya creado
        });
    });
});

app.put('/:id', function(req, res, next){
        //params extrae el parámetro de la pregunta (req)
    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if(err) return next (err);
        res.status(201).json({
            ok:true,
            mensaje:'Proveedor actualizado'
        });
    });        
});

app.delete('/:id', function(req, res, error){

    Proveedor.findByIdAndRemove(req.params.id, function(err, datos){
        if(err) return next (err);
        res.status(200).json({
            ok:true,
            mensaje:'Proveedor eliminado'
        });
    });
});


module.exports = app;