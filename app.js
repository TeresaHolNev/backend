var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor.js');

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

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended': false}));

app.use('/proveedor', proveedor);

app.listen(3000,function(){
    console.log('Servidor ok en el puerto 3000');
})