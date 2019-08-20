'use strict' 
var jwt= require('jwt-simple');
var moment=require('moment');
var secret='calve_secreta_curso';

exports.exsureAuth= function(req, res,next){
if(!req.headers.authorization){
    return res.status(403).send({message: 'la peticion no tiene header'});

}
var token=req.headers.authorization.replace(/['"']+/g,'');

try{
    var payload=jwt.decodde(token, secret);
    if(payload0jwt.exp<=m){

    }
}catch(ex){
    console.log(ex);
    return res.status(404).send({message: 'Token no valido'});
}

};