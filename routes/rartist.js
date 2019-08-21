'use strict'
var express = require('express');
var ArtistController = require('../controller/cartists');
var api = express.Router();
var md_auth=require('../middlewares/authenticated');




api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist );
api.post('/artist', md_auth.ensureAuth, ArtistController.saveartist );
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists );

module.exports=api;