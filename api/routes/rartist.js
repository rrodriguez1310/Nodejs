'use strict'
var express = require('express');
var ArtistController = require('../controller/cartists');
var api = express.Router();
var md_auth=require('../middlewares/authenticated');

var multipart=require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/artists' });




api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist );
api.post('/artist', md_auth.ensureAuth, ArtistController.saveartist );
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists );
api.put('/artists/:id', md_auth.ensureAuth, ArtistController.updateArtist );
api.delete('/artists/:id', md_auth.ensureAuth, ArtistController.deleteArtist );
api.post('/upload-image-artists/:id',[md_auth.ensureAuth, md_upload], ArtistController.uploadImage);
api.get('/get-image-artists/:imageFile', ArtistController.getImageFile);
module.exports=api;