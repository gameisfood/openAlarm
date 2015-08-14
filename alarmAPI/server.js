console.log("Starting api server");

var express = require('express');
var app = express();
var port = 9090;
app.get('/', function(req, res){
  res.send('hello world');
});

console.log("Server Running on Port " + port);
app.listen(port);
