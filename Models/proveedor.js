var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var ProveedorSchema = new mongoose.Schema({
    nombre:String,  //Propiedades que tiene este modelo(campos que almacene o cree en la base de datos)(podemos tiparlo)
    cif:{type: String, unique: true },
    domicilio:String,
    cp:Number,
    localidad:String,
    provincia:String,
    telefono:String,
    mail:String,
    contacto:String
})

//Al objeto de errores de mongoose
ProveedorSchema.plugin(unique, {message: 'El CIF introducido ya existe'});

module.exports = mongoose.model('Proveedor', ProveedorSchema);  //Exportamos para poder usarlo en otro documento