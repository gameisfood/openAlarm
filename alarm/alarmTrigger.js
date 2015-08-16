var redis = require('redis') ,
    settings = require('../settings.js');
var Player = require('node-mpg123'),
    player = new Player('../woodKid1.mp3');


var ring = function(id) {
    var client = redis.createClient();//settings.REDIS_URI , settings.REDIS_PORT);
    //json id holder should go here.. playing from the relevent src and stuff..
    client.get(id, function (err, reply) {
            var jid = reply.toString();
            console.log("Ring Ring @jid:", jid);
            player.play();
        });

        player.on('playing',function(item){
          console.log('im playing... src:' + item);
        });
        player.on('error', function(err){
          // when error occurs
          console.log(err);
        });
        player.on('complete', function () {
            console.log('Done with alarm playback!');
        });
}
exports.ring = ring;
