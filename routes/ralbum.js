'use strict'

var express = require('express');
var AlbumController = require('../controller/calbum');
var md_auth=require('../middlewares/authenticated');

var multipart=require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/albums' });


//para aplicar los middlewares se lo pasamos en segundo luego de la ruta
var api = express.Router();
api.get('/album/:id',md_auth.ensureAuth, AlbumController.getAlbum);

api.post('/album',md_auth.ensureAuth, AlbumController.saveAlbum);

module.exports=api;