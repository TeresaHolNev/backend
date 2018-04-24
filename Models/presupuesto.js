var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var PresupuestoSchema = new mongoose.Schema({
    proveedor:String,  //Propiedades que tiene este modelo(campos que almacene o cree en la base de datos)(podemos tiparlo)
    cif:String,
    fecha:String,
    base:Number,
    tipo:Number,
    importe:String,
    total:String,
    irpf:String,
    retencion:Boolean,
    fecha:String,
    fechaRegistro:Date,
    concepto:String
})

//Al objeto de errores de mongoose
// FacturaSchema.plugin(unique, {message: 'El CIF introducido ya existe'});
module.exports = mongoose.model('Presupuesto', PresupuestoSchema);  //Exportamos para poder usarlo en otro documento

