var redis = require('redis');
var settings = require('../shared_resources/settings.js')

var client = redis.createClient(settings.REDIS_PORT,settings.REDIS_URI, {});

client.on("connect", function () {
       console.log("redis-messenger.js : API Server connected to REDIS");
       console.log("redis-messenger.js : Port : " + settings.REDIS_PORT);
       console.log("redis-messenger.js : URI : " + settings.REDIS_URI);
   });

client.on("error", function (err) {
    console.log("redis-messenger.js : " + err);
});

exports.addNewAlarm = function(alarmProperties) {
  client.INCR("uniqueKey");
  client.get("uniqueKey", function (err, reply) {
    console.log("Adding new alarm with ID : " + reply);
    client.set(reply, alarmProperties);
  });
};

exports.getAlarmByID = function(alarmID) {
  client.get(alarmID, function (err, reply) {
    console.log(reply);
    return reply;
  });
};

exports.deleteAlarmByID = function(alarmID) {
  client.del(alarmID, function (err, reply) {
    console.log(reply);
  });
};
