console.log("server.js : Starting api server");

var express = require('express');
var app = express();
var router = express.Router();
var settings = require('../shared_resources/settings.js')
var port = settings.API_PORT;
var alarm_util = require("./redis-messenger.js");
var alarmTemplateJSON = require("../shared_resources/alarmTemplate.json");
var bodyParser = require('body-parser');
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api', function(req, res){
  res.send('This is the openAlarm API, for docs go to http://loltheresnodocswhodoyouthinkiam.com');
});

var serveTemplate = router.route('/alarm/template');
serveTemplate.get(function(req, res) {
  res.json(alarmTemplateJSON);
});

var addAlarm = router.route('/alarm/add');
console.log("server.js : handling creating of alarm");
addAlarm.post(function(req, res) {
  var newAlarm = req.body.alarm;
  alarm_util.addNewAlarm(newAlarm);
  res.send("Alarm Added, maybe perhaps")
});

var getAlarm = router.route('/alarm/id/:id');
getAlarm.get(function(req, res) {
  var alarmID = req.params.id;
  console.log("server.js : getting alarm with id : " + alarmID);
  alarm_util.getAlarmByID(alarmID,res);
});

var getAllAlarms = router.route('/alarm/all');
getAllAlarms.get(function(req, res) {

  alarm_util.getAllAlarms(res);

});

app.use('/api', router)
console.log("server.js  :  Running on Port " + port);
app.listen(port);
