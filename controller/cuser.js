'use strict'


var bcrypt = require('bcrypt');
var User = require('../models/user');




function pruebas(req, res) {
    res.status(200).send({
        message: 'Esto es una prueba desde el controlador'
    });

}

function saveUser(req, res) {
    var user = new User();
    var params = req.body;
    //con el metodo body recojemos todo lo que traiga params.name, params.id...
    //params es lo que trae por POST
    console.log(params);
    user.surname = params.surname;
    user.name = params.name;
    user.email = params.email;
    user.role = 'ROLE_USE';
    user.image = 'null';
    //user.password = 'rodo';

    if (params.password) {
       
           // console.log("Entro dentro del if password=true" ); //Encriptar contraseña y guardar datos
            //console.log(user );
            //}
        //encripta el password

   bcrypt.hash(params.password,  10, null,  function(err,hash){
        user.password=hash;
        if(user.name!=null && user.surname!=null && user.email!=null){  
                //guradra el usuario
                    user.save((err, userStored)=>{
                                if(err){
                                    res.status(500).send({message:'Error al guardar'});
                                }else{

                                    if(!userStores){
                                        res.status(500).send({message:'No se registro'});
                                    }else{
                                        res.status(200).send({user:userStored});
                                       }

                                         }
                                         res.status(200).send({user:userStored});
                        });

             

          }else{   
            res.status(200).send({message:'Por favor rellenas todos los datos.'});
            }

        });

    } else {
        res.status(200).send({message:'Introduce el password'});
    }
    
   

}


module.exports = {
    pruebas, 
    saveUser
}; 