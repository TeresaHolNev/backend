var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor.js');
var factura = require('./routes/factura.js');
var usuario = require('./routes/usuario.js');
var login = require('./routes/login.js');
var cliente = require('./routes/cliente.js');
var presupuesto = require('./routes/presupuesto.js');
var sesion = require('./routes/sesion.js')


var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/erp',{promiseLibrary: require('bluebird')})   //Puerto de servidor de mongo
    .then(()=>{
        console.log('Conectado a la base de datos')
    })
    .catch((err)=>{
        console.error(err);
    });

    //Para eliminar problemas de las cabeceras.No tiene nada que ver con Angular o node,simplemente es una implemetación
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Request-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    next();
})

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended': false}));

app.use('/proveedor', proveedor);
app.use('/factura', factura);
app.use('/usuario',usuario);
app.use('/login',login);
app.use('/cliente',cliente);
app.use('/presupuesto',presupuesto);
app.use('/sesion',sesion);





app.listen(3000,function(){
    console.log('Servidor ok en el puerto 3000');
})