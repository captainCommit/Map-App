console.log('routes.js loaded');

//imports
const express = require('express');
const mongoose = require('mongoose');
const fauna = require('../Fauna/fauna');
const mongoDB = 'mongodb://127.0.0.1/mapdb';
const router = express.Router()

//Code starting
console.log("Object model Loaded");
mongoose.connect(mongoDB,{useNewUrlParser : true}).then(()=>{console.log("DB Connected Succesfully");}).catch((err)=>{console.log("Error In Collection");});
//General Search
router.get('/gens',function(req,res,next)
{
      console.log(req.query);
      if(req.query.type == "any")
      {
              var name = req.query.name;
              fauna.find({$text : {$search : name},year : {$gte : req.query.start,$lte : req.query.end}},(list,err)=>
              {
                  if(err)
                      res.send(err);
                  else {
                    res.json(list);
                  }
              });
      }
      else
      {
          console.log(req.query);
          var query;
          for(var k in req.query)
          {
              console.log(k+"    "+req.query[k]);
              query = '{"'+k+'" : "'+req.query[k]+'"}';
              break;
          }
          console.log(query);
          var obj = JSON.parse(query);
          console.log(typeof(obj));
          fauna.find(obj).where('year').gte(req.query.start).lte(req.query.end).exec(function(err,list){
              if(err)
                  res.send(err);
              else
                res.json(list);
          });
      }
});

//Spatial Search

module.exports = router;
