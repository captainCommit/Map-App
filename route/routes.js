console.log('routes.js loaded');

//imports
const express = require('express');
const mongoose = require('mongoose');
const fauna = require('../Fauna/fauna');
const mongoDB = 'mongodb://127.0.0.1/mapdb';
const router = express.Router()

//Code starting
console.log("Object model Loaded");
mongoose.connect(mongoDB,{useNewUrlParser : true}).then(()=>{console.log("DB Connected Succesfully");}).catch((err)=>{console.log("Error In Connection");});
//General Search + Spatial Search + Temporal Search
router.get('/gens',function(req,res,next)
{
      console.log(req.query);
      if(req.query.state)
      {
        if(req.query.type == "any")
        {
                var name = req.query.name;
                fauna.find({$text : {$search : name},year : {$gte : req.query.start,$lte : req.query.end},state : req.query.state},(list,err)=>
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
            var obj = JSON.parse(query);
            fauna.find(obj).where('year').gte(req.query.start).lte(req.query.end).where('state').equals(req.query.state).exec(function(err,list){
                if(err)
                    res.send(err);
                else
                  res.json(list);
            });
        }
      }
      else
      {
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
            var obj = JSON.parse(query);
            fauna.find(obj).where('year').gte(req.query.start).lte(req.query.end).exec(function(err,list){
                if(err)
                    res.send(err);
                else
                    res.json(list);
            });
        }
      }
});
// Bounding Box Search
router.get('/bbox/:ulat/:ulng/:llat/:llng',function(req,res,next)
{
    console.log("Bounding Box");
    var ulat = req.params.ulat;
    var ulng = req.params.ulng;
    var llat = req.params.llat;
    var llng = req.params.llng;
    console.log(ulat,ulng,llat,llng);
    console.log(req.query);
    if(req.query.state)
    {
      if(req.query.type == "any")
      {
              var name = req.query.name;
              fauna.find({$text : {$search : name},year : {$gte : req.query.start,$lte : req.query.end},state : req.query.state,latitude : {$gte : llat,$lte : ulat},longitude : {$gte : llng,$lte : ulng}},(list,err)=>
              {
                  if(err)
                      res.send(err);
                  else {
                    if(list.length == undefined)
                      console.log("empty");
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
          var obj = JSON.parse(query);
          fauna.find(obj).where('year').gte(req.query.start).lte(req.query.end).where('state').equals(req.query.state).where('latitude').gte(llat).lte(ulat).where('longitude').gte(llng).lte(ulng).exec(function(err,list){
              if(err)
                  res.send(err);
              else
                {
                  if(list.length == undefined)
                    console.log("empty");
                  res.json(list);
                }
          });
      }
    }
    else
    {
      if(req.query.type == "any")
      {
              var name = req.query.name;
              fauna.find({$text : {$search : name},year : {$gte : req.query.start,$lte : req.query.end},latitude : {$gte : llat,$lte : ulat},longitude : {$gte : llng,$lte : ulng}},(list,err)=>
              {
                  if(err)
                      res.send(err);
                  else {
                    if(list.length == undefined)
                      console.log("empty");
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
          var obj = JSON.parse(query);
          fauna.find(obj).where('year').gte(req.query.start).lte(req.query.end).where('latitude').gte(llat).lte(ulat).where('longitude').gte(llng).lte(ulng).exec(function(err,list){
              if(err)
                  res.send(err);
              else{
                if(list.length == undefined)
                  console.log("empty");
                  res.json(list);
                }
          });
      }
    }
})
router.get('/buildtree/:state',function(req,res,next){
        var query = req.query;
        var state = req.params.state;
        fauna.distinct(state,query,(list,err)=>{
            if(err)
                res.send(err);
            else
                res.json(list);
        })
})
module.exports = router;
