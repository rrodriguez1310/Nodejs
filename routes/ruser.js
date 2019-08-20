'use strict'

var express = require('express');
var UserController = require('../controller/cuser');

var api = express.Router();
api.get('/probando-controlador', UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports=api;