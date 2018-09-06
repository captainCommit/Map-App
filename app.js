console.log("app.js loaded");
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mongo = require('mongojs');
var tasks = require('./route/routes');
var app = express();

//View Engine
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static('./dist'));
app.use('/', express.static(path.resolve('dist/index.html')));

var db = mongo('mongodb://localhost/mapdb', ['data']);
// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', tasks);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
