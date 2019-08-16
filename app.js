'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//cragar rutas
var user_routes=require('./routes/ruser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

////configurar cabecerascurso



//ruta base
app.use('/api', user_routes);


module.exports=app;