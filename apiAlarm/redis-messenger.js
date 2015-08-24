var redis = require('redis');
var settings = require('../shared_resources/settings.js')

var client = redis.createClient(settings.REDIS_PORT,settings.REDIS_URI, {});
var unique_key = "uniqueKey";
client.on("connect", function () {
       console.log("redis-messenger.js  : API Server connected to REDIS");
       console.log("redis-messenger.js  :  Port : " + settings.REDIS_PORT);
       console.log("redis-messenger.js  :  URI  :  " + settings.REDIS_URI);
   });

client.on("error", function (err) {
    console.log("redis-messenger.js : " + err);
});

exports.addNewAlarm = function(alarmProperties) {
  client.INCR(unique_key);
  client.get(unique_key, function (err, reply) {
    console.log("Adding new alarm with ID : " + reply);
    client.set(reply, alarmProperties);
  });
};

exports.getAlarmByID = function(alarmID, callback) {
  client.get(alarmID, function (err, reply) {
    console.log(reply);
    callback.json(reply);
  });
};

exports.getAllAlarms = function(callback) {
  client.keys("*", function (err, keys) {
    if (err) return console.log(err);

    var alarms = [];

    var len = keys.length;

    function iterator(i) {
      if(i<len){
        client.get(keys[i], function (err, reply) {
          alarms.push(reply);
          console.log(reply);
          iterator(i+1);
        });
      }else{
          callback.json({keys: keys, alarms: alarms});
      }
    }
    iterator(0);
  });
};

exports.deleteAlarmByID = function(alarmID) {
  client.del(alarmID, function (err, reply) {
    console.log(reply);
  });
};
