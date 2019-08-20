'use strict' 
var jwt= require('jwt-simple');
var moment=requiere('moment');
var secret='calve_secreta_curso';

exports.createToken=function(user){
    var payload={
        sub:user.id,
        name:user.name,
        surname:user.surname,
        email:user.email,
        role:user.image,
        iat:moment().unix,
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);

};
