'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var AlbumSchema=Schema({
titulo: String,
descripctio:String,
year:Number,
image:String,
artist:{type: Schema.objectId, ref:'Artist'}
});
module.exports=mongoose.model('Album', ArtistSchema);