var redis = require('redis') ,
    settings = require('../shared_resources/settings.js');
var Player = require('node-mpg123'),
    player = new Player('../woodKid.mp3');
var delayed = require('delayed');

var finishedPlaying;
var ring = function(id) {
    var client = redis.createClient();//settings.REDIS_URI , settings.REDIS_PORT);
    //json id holder should go here.. playing from the relevent src and stuff..
    client.get(id, function (err, reply) {
            var jid = reply.toString();
            console.log("Ring Ring @jid:", jid);
            player.play();
            finishedPlaying = false;
        });

        //check if the player has finished playing too soon.. if so there was an error with the media file.
        delayed.delay(function () {
          if(finishedPlaying === true)
            console.log("Error playing media file.");
        }, 1000)

        player.on('complete', function () {
            console.log('Done with alarm playback!');
            finishedPlaying = true;
        });
}
exports.ring = ring;
