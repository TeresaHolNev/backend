var mongoose = require('mongoose');

var SesionSchema = new mongoose.Schema({
    nombre: String,
    login: Date,
    logout: Date
});

module.exports = mongoose.model('Sesion',SesionSchema);