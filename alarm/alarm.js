var redis = require('redis');
var settings = require('../shared_resources/settings.js');
var client = redis.createClient();//settings.REDIS_URI , settings.REDIS_PORT);
var trigger = require('./alarmTrigger.js');
var CronJob = require('cron').CronJob;

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
/*
console.log("Getting alarm at 01: ");
client.get("01", function (err, reply) {
        console.log(reply.toString());
    });
    */

//add a cronjob for the above time
new CronJob('0 * * * * *', function() {
    trigger.ring("01");
      //console.log('You will see this message every second');
    }, null, true, null);
