'use strict'

var express = require('express');
var UserController = require('../controller/cuser');
var md_auth=require('../middlewares/authenticated');


//para aplicar los middlewares se lo pasamos en segundo luego de la ruta
var api = express.Router();
api.get('/probando-controlador',md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports=api;