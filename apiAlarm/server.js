console.log("Starting api server");

var express = require('express');
var app = express();
var router = express.Router();
var port = 9090;
var alarm_util = require("./redis-messenger.js");
var alarmTemplateJSON = require("../shared_resources/alarmTemplate.json");
app.get('/api', function(req, res){
  res.send('This is the openAlarm API, for docs go to http://loltheresnodocswhodoyouthinkiam.com');
});

var serveTemplate = router.route('/alarm/template');
serveTemplate.get(function(req, res) {
  res.json(alarmTemplateJSON);
})

var addAlarm = router.route('/alarm/add');
addAlarm.post(function(req, res) {
  var alarm = req.body.alarm;

});

app.use('/api', router)
console.log("Server Running on Port " + port);
app.listen(port);
