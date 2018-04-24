var express = require('express'); //Importamos Express
var mongoose = require('mongoose'); //Importamos mongoose

var Presupuesto = require('../Models/factura.js'); //Conectamos la ruta con el modelo (se puede poner sin parémtesis)

var app = express();

app.get('/', (req, res, next) => {

    Presupuesto.find({}).exec((err, presupuestos) => { //Para que nos busque todos los proveedores
        if (err)    //Si hubiera un error
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        res.status(200).json({
            ok: true,
            presupuestos: presupuestos
        });
    });

});

app.get('/:id', function(req, res, next){
    
    Presupuestos.findById(req.params.id, (err, factura)=>{
        if (err) {   //Si hubiera un error
            return res.status(500).json({
                ok:false,
                mensaje:'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            presupuesto: presupuesto
        });   
    });
});

app.post('/', (req, res) => {

    var body = req.body;   //En el cuerpo de las peticiones res. que hagamos vamos a mandar un json

    var presupuesto = new Presupuesto({  //Nos creamos la asociación para cada propiedad
        proveedor: body.proveedor,
        cif:body.cif,
        base:body.base,
        fecha:body.fecha,
        concepto:body.concepto,
        tipo: body.tipo,
        importe: body.importe,
        total: body.total,
        irpf: body.irpf,
        retencion: body.retencion
    })

    presupuesto.save((err, presupuestoGuardado) => {    //Guardar en la base de datos las propiedades que le demos
        if (err) {   //Si hay error
            return res.status(400).json({   //conteste con un json
                ok: false,  //De que es falso
                mensaje: 'Error al el presupuesto', //Con este mensaje
                errores: err //Error sea err
            })
        }
        res.status(200).json({  //si la respuesta es correcta
            ok: true, //Y sea verdadero
            presupuesto: presupuestoGuardado //conteste el proveedor ya creado
        });
    });
});

app.put('/:id', function (req, res, next) {
    //params extrae el parámetro de la pregunta (req)
    Presupuesto.findByIdAndUpdate(req.params.id, req.body, function (err, datos) {
        if (err) return next(err);
        res.status(201).json({
            ok: true,
            mensaje: 'Presupuesto actualizado'
        });
    });
});

app.delete('/:id', function (req, res, error) {

    Presupuesto.findByIdAndRemove(req.params.id, function (err, datos) {
        if (err) return next(err);
        res.status(200).json({
            ok: true,
            mensaje: 'Presupuesto eliminado'
        });
    });
});


module.exports = app;