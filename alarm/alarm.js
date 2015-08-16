var redis = require('redis');
var settings = require('../settings.js');
var client = redis.createClient();//settings.REDIS_URI , settings.REDIS_PORT);
var trigger = require('./alarmTrigger.js');
    //trigger = new alarmTrigger();

console.log("Wake up please?");
console.log("No snooge.!");

client.on('connect', function() {
    console.log('connected');
});
client.on('error',function(err) {
    console.log(err.message);
});

//add an alarm ex(without json)
client.set("01","09:00");
console.log("Set example");
console.log("Getting alarm at 01: ");
client.get("01", function (err, reply) {
        console.log(reply.toString());
    });
var ringer = trigger.ring;
ringer("01");
