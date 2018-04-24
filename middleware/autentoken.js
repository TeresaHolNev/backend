var jsonwebtoken = require ('jsonwebtoken');

exports.verificarToken = function(req, res, next){

    var token = res.query.token;

    jsonwebtoken.verify(token,'yitkjhgtkvbfcdgjfxchngf', (err,decoded)=>{
        if(err){
            return resizeBy.status(400).json({
                ok:false,
                mensaje:'token incorrecto',
                errores: err
            })
        }

        req.usuario = decoded.usuario;
        next();
    })
}