var Twit = require('twit');

var T = new Twit({
    consumer_key:         'process.env.consumer_key',
    consumer_secret:      'process.env.consumer_secret',
    access_token:         'process.env.access_token',
    access_token_secret:  'process.env.access_token_secret',
    timeout_ms:           60*1000,
});

//Set up a user stream
var stream = T.stream('user');

//Anytime someone tweets at me
stream.on('tweet', tweetEvent);

console.log('twitterbot running!');

function tweetEvent(eventMsg) {

    console.log('Tweeted at');

    var jsonfile = require('jsonfile');
    var replyto = eventMsg.in_reply_to_screen_name;
    var text = event.text;

    if(replyto === 'JayCGildea') {
        var values = text.split(",");

        for(i=0; i < values.length; i++) {
            values[i] = values[i].split(values[i].search(":"), values[i].length - 1);
        }

        var file = '/data/supplies.json';
        var obj = {
            name: values[0],
            food: values[1],
            water: values[2],
            gas: values[3],
            lat: values[4],
            lng: values[5]
        };

        jsonfile.writeFile(file, obj, function(err) {
            console.error(err);
        });

        var tweet = {
            status: '@' + eventMsg.user['screen_name'] + ' thanks for the info!'
        };

        T.post('statuses/update', tweet, tweeted);

        function tweeted(err, data, response) {
            if(err) {
                console.log("Something went wrong");
            } else {
                console.log("It worked!");
            }
        }
    }
}