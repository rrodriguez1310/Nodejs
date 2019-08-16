'use strict'
var mongoose = require('mongoose');

var app=require('./app');
var port=process.env.PORT || 3981;





//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_means2',{ useNewUrlParser: true }, (err, res)=>{

if(err){
throw err;}
else
{console.log("la base esta corriendo");
 app.listen(port,function(){console.log("servidor del servicio API esta por el puerto "+port);});

}
});