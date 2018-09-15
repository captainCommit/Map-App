console.log('routes.js loaded');

//imports
var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();
//const app = express();
var db = mongojs('mongodb://127.0.0.1/mapdb', ['finaldata']);
if(db != null)
  console.log("MongoDB connected Successfully");

module.exports = router;
