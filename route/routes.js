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
