var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var tasks = require('./route/routes');
var index = require('./route/index');

var port = 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function(){
    console.log('Server started on port '+port);
});
