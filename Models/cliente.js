var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var ClienteSchema = new mongoose.Schema({
    nombre:String,  //Propiedades que tiene este modelo(campos que almacene o cree en la base de datos)(podemos tiparlo)
    cif:{type: String, unique: true },
    domicilio:String,
    cp:Number,
    localidad:String,
    provincia:String,
    telefono:String,
    email:String,
    contacto:String
})

//Al objeto de errores de mongoose
ClienteSchema.plugin(unique, {message: 'El CIF introducido ya existe'});

module.exports = mongoose.model('Cliente', ClienteSchema);  //Exportamos para poder usarlo en otro documento