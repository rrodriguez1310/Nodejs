'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//cragar rutas
var user_routes=require('./routes/ruser');
var artist_routes=require('./routes/rartist');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

////configurar cabecerascurso



//ruta base
app.use('/api', user_routes);
app.use('/api', artist_routes);


module.exports=app;