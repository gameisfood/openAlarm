var redis = require('redis');
var settings = require('../settings.js');
var client = redis.createClient(settings.REDIS_URI , settings.REDIS_PORT);

console.log("Wake up please?");
console.log("No snooge.!");

client.on('connect', function() {
    console.log('connected');
});
client.on('error',function() {
    console.log('Error connecting radis');
});

//add an alarm ex(without json)
