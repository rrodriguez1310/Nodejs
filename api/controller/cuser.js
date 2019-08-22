'use strict'


var bcrypt = require('bcrypt-nodejs') ;
var User = require('../models/user');
var jwt=require('../services/jwt.js');

var fs=require('fs');
var path=require('path');




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

   bcrypt.hash(params.password,  null, null, function(err,hash){
        user.password=hash;
        
        if(user.name!=null && user.surname!=null && user.email!=null){  
                //guradra el usuario
             
                    user.save((err, userStored)=>{
                                if(err){
                                   
                                    res.status(500).send({message:'Error al guardar'});
                                }else{
                                    
                                    if(!userStored){
                                       
                                        res.status(500).send({message:'No se registro'});
                                    }else{
                                       
                                        res.status(200).send({user:userStored});
                                       }
                                      
                                         }
                                        
                        });

             

          }else{   
            res.status(200).send({message:'Por favor rellenas todos los datos.'});
          }

        });
     

    } else {
        res.status(200).send({message:'Introduce el password'});
    }
    
   

}


function loginUser(req, res){

    var params=req.body;
    var email=params.email;
    var password=params.password;
    User.findOne({email: email.toLowerCase()}, (err, user)=> {
        if (err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!user){
               
                res.status(404).send({message:'error en la peticion'});
            }else{
                //console.log("1 "+password);
                //console.log("2 "+user.password);
                //res.status(200).send({user});
                bcrypt.compare(password,user.password, function(err, check){
                    if(check){
                                if(params.gethash){
                                    ///comprueba si tiene tocken
                                        res.status(200).send({
                                            token: jwt.createToken(user)
                                        });
                                }else{
                                   // user.password=password;
                                    res.status(200).send({user});

                                }
                    }else{
                      //  console.log("1 "+password);
                       // console.log("2 "+user.email);
                        res.status(404).send({message:'usuario2 o contraseña incorrecta'}); 
                    }

                });
            }
        }


    });

}

function updateUser(req, res){


    var userId = req.params.id;
    var update = req.body;


    
    User.findOneAndUpdate(userId, update, (err, userUpdated)=> {
        if(err){
            res.status(500).send({message:'Error al actualizar el Usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar'});
            }else{
                    res.status(200).send({user: userUpdated});
            }
        }
    });
}

function uploadImage(req, res){
	var userId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
				if(!userUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({image: file_name, user: userUpdated});
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}


function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile;
    
    fs.access(path_file, fs.constants.F_OK, (err) => {
    if(!err){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({ message: 'No existe la imagen' });
    }
    
    }); 
   }




module.exports = {
    pruebas, 
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}; 