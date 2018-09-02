//imports
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
