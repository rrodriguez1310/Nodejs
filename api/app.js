'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//cragar rutas
var user_routes=require('./routes/ruser');
var artist_routes=require('./routes/rartist');
var album_routes=require('./routes/ralbum');
var song_routes=require('./routes/rsong');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

////configurar cabecerascurso

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});


//ruta base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);


module.exports=app;