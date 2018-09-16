console.log('routes.js loaded');

//imports
const express = require('express');
const mongoose = require('mongoose');
const fauna = require('./../Fauna/fauna');
const mongoDB = 'mongodb://127.0.0.1/mapdb';
const router = express.Router()
//Code starting
console.log("Object model Loaded");
mongoose.connect(mongoDB,{useNewUrlParser : true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//General Search
router.get('/gens',function(req,res,next){
    console.log(req.query);
})
//Tree Build
var list;
fauna.distinct("phylum",(err,list)=>{
    if(err)
      console.log(err);
    else {
        console.log(list);
    }
})
module.exports = router;
