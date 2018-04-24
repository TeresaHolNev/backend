var express = require('express'); //Importamos Express
var mongoose = require('mongoose'); //Importamos mongoose

var Cliente = require('../Models/cliente.js'); //Conectamos la ruta con el modelo (se puede poner sin parémtesis)

var app = express();

app.get('/', (req, res, next)=>{
    
    Cliente.find({}).exec((err, clientes)=>{ //Para que nos busque todos los clientes
        if (err)    //Si hubiera un error
            return res.status(500).json({
                ok:false,
                mensaje:'Error acceso DB',
                errores: err
            })
        res.status(200).json({
            ok: true,
            clientes: clientes
        });        
    });

});

app.get('/:id', function(req, res, next){
    
    Cliente.findById(req.params.id, (err, cliente)=>{
        if (err) {   //Si hubiera un error
            return res.status(500).json({
                ok:false,
                mensaje:'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            cliente: cliente
        });   
    });
});

app.post('/', (req,res)=>{

    var body = req.body;   //En el cuerpo de las peticiones res. que hagamos vamos a mandar un json

    var cliente = new Cliente({  //Nos creamos la asociación para cada propiedad
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,    
        email: body.email,
        contacto: body.contacto,
    })

    cliente.save((err, clienteGuardado)=>{    //Guardar en la base de datos las propiedades que le demos
        if(err) {   //Si hay error
            return res.status(400).json({   //conteste con un json
                ok: false,  //De que es falso
                mensaje: 'Error al crear el cliente', //Con este mensaje
                errores:err //Error sea err
            })
        }
        res.status(200).json({  //si la respuesta es correcta
            ok:true, //Y sea verdadero
            cliente: clienteGuardado //conteste el cliente ya creado
        });
    });
});

app.put('/:id', function(req, res, next){
        //params extrae el parámetro de la pregunta (req)
    Cliente.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if(err) return next (err);
        res.status(201).json({
            ok:true,
            mensaje:'Cliente actualizado'
        });
    });        
});

app.delete('/:id', function(req, res, error){

    Cliente.findByIdAndRemove(req.params.id, function(err, datos){
        if(err) return next (err);
        res.status(200).json({
            ok:true,
            mensaje:'Cliente eliminado'
        });
    });
});


module.exports = app;