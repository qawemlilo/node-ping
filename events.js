"use strict";


var config = require('./config.json');
var mailer = require('./mailer');


/*
    Handles events emitted when a websites stop being monitored

    @param - (String) website - website url
*/
function onStop (website) {

    mailer({
        from: config.email,
        to: config.email,
        subject: website + ' monitor has stopped',
        body: '<p>' + website + ' is no longer being minitored.</p>'
    },

    function (error, res) {
        if (error) {
            console.log('Failed to send email. ' + error.message);
        }
        else {
            console.log(res.message);
        }
    });
}




/*
    Handles events emitted when a website is down

    @param - (Object) res - response object return by the Node Monitor object
*/
function onDown (res) {

    var msg = '';

    msg += '<p>Time: ' + res.time;
    msg += '</p><p>Website: ' + res.website;
    msg += '</p><p>Message: ' + res.statusMessage + '</p>';

    mailer({
        from: config.email,
        to: config.email,
        subject: res.website + ' is down',
        body: msg
    },

    function (error, res) {
        if (error) {
            console.error('Failed to send email. ' + error.message);
        }
        else {
            console.log(res.message);
        }
    });
}


/*
    Handles events emitted when aa error occurs

    @param - (String) msg - response message
*/
function onError (msg) {
    console.log(msg);
}


module.exports.onStop = onStop;
module.exports.onDown = onDown;
module.exports.onError = onError;
