var path = require('path');
var Twit = require('twit');
var request = require('request');

var T = new Twit({
    consumer_key:         'HD8eGdSQDSiddZXtNOO0NbraE',
    consumer_secret:      'fzbcVcquhVDDasXf5JtanJT8C3jm7KKx0i7jzQxPFDP3nC1Mmh',
    access_token:         '3407801057-49iMUcmObf4Li9P7aGf4G5aGbcTayYYPt42jAg1',
    access_token_secret:  'FrgtewCtbsA1fKu67yWzpfPXPsveCsQ4s60lVHscKL22w'
});

//Set up a user stream
var stream = T.stream('user');

//Anytime someone tweets at me
stream.on('tweet', tweetEvent);

console.log('twitterbot running!');

function tweetEvent(eventMsg) {

    console.log('Tweeted at');

    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;

    if(replyto === 'JayCGildea') {
        var values = text.split(",");

        for(i=0; i < values.length; i++) {
            values[i] = values[i].substr(str.indexOf(":") + 1);
        }

        var file = path.join(__dirname, 'data/supplies.json');


        request('https://disasterdistributor.herokuapp.com/supplies/add/' +
            values[0] + '/' + values[1] + '/' + values[2] + '/' + values[3] +
                '/' + values[4] + '/' + values[5]);

        //var tweet = {
        //    status: '@' + eventMsg.user.screen_name + ' thanks for the info!'
        //};

        //T.post('statuses/update', tweet, tweeted);

        //function tweeted(err, data, response) {
        //    if(err) {
        //        console.log("Something went wrong");
        //    } else {
        //        console.log("It worked!");
        //    }
        //}
    }
}