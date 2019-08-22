'use strict'

var express = require('express');
var UserController = require('../controller/cuser');
var md_auth=require('../middlewares/authenticated');

var multipart=require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });


//para aplicar los middlewares se lo pasamos en segundo luego de la ruta
var api = express.Router();
api.get('/probando-controlador',md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.put('/update-user/:id',md_auth.ensureAuth,  UserController.updateUser);

api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports=api;