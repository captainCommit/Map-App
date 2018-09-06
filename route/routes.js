//<<<<<<< HEAD
//imports
console.log('routes.js loaded');
var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();
//const app = express();
var db = mongojs('mongodb://127.0.0.1/mapdb', ['data']);
if(db != null)
  console.log("MongoDB connected Successfully");
//query for all sets
router.get('/person',function(req,res,next){
  console.log("recieved --> %s",req.query);

  db.data.find(req.query,function(err,person){
    if(err)
    {
        res.send(err);
    }
    res.json(person);
  })
})

//filter by year
router.get('/person/:start/:end',function(req,res,next){
  var arr = []
  var j=0;
  const start = req.params.start;
  const end = req.params.end;
  db.data.find(req.query,function(err,person){
    if(err)
      res.send(err);
    for(var i = 0;i< person.length;i++)
    {
        if(person[i].year >= start && person[i].year <= end)
            arr[j++] = person[i];
    }
    console.log(arr);
    var json = JSON.stringify(arr);
  })
})
/*app.listen('3000',()=>{
  console.log("Server Started on Port 3000");
}); */
module.exports = router;
/*=======
imports
var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();
var db = mongojs('mongodb://localhost/mapdb', ['data']);
if(db != null)
  console.log("MongoDB connected Successfully");
//search by name
  router.get('/name/:name', function(req, res, next){
      search_name = req.params.name;
      db.data.find({name:search_name},function(err, person){
          if(err){
              res.send(err);
          }
          for(var i = 0;i<person.length;i++)
            console.log("%s ---- >  %s \n",person[i].name,person[i].dob);
          res.json(person);
      });
  });
//search by dob
  router.get('/dob/:dob',function(req,res,next)
  {
    date = new Date(req.params.dob).toISOString();
    db.data.find({dob : date},function(err,person){
      if(err)
      {
        res.send(err);
      }
      for(var i = 0;i<person.length;i++)
        console.log("%s ---- >  (%s,%s)",person[i].name,person[i].lat,person[i].long);
      res.json(person);
    });
  });
 //search by range of search_date
 router.get('/range/:dob_start/:dob_end',function(req,res,next)
 {
   start_date = new Date(req.params.dob_start).toISOString();
   end_date = new Date(req.params.dob_end).toISOString();
   db.data.find({dob : {$gte: start_date , $lte : end_date}},function(err,person){
     if(err)
     {
       res.send(err);
     }
     for(var i = 0;i<person.length;i++)
      console.log("%s ---- >  (%s,%s)",person[i].name,person[i].lat,person[i].long);
     res.json(person);
   });
 });
//search by country
router.get('/con/:con',function(req,res,next){
  db.data.find({con : req.params.con},(err,person)=>{
    if(err)
      res.send(err);
    for(var i = 0;i<person.length;i++)
    {
      console.log("%s ---- >  (%s,%s)",person[i].name,person[i].lat,person[i].long);
    }
    res.json(person);
  })
})
module.exports = router;
>>>>>>> 0fddccd4dcad2b3bfb52a268dbfe8acc2f0d645d*/

