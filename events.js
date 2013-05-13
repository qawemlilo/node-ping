
/*
    Event Handlers
*/

var config = require('./config.json'),
    mailer = require('./mailer');

    
/*
    Handles events emitted when a websites stop being monitored

    @param - (String) website - website url    
*/
function onStop (website) {
    "use strict";
    
    mailer({
        from: config.GmailAuth.email,   
        to: config.sendToAddress,  
        subject: website + ' monitor has stopped',   
        body: '<p>' + website + ' is no longer being minitored.</p>'
    }, 
    
    function (error, res) {
        if (error) {
            console.log('Failed to send email');
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
    "use strict";
    
    var msg = '';

    msg += '<p>Time: ' + res.time;
    msg += '</p><p>Website: ' + res.website;
    msg += '</p><p>Message: ' + res.statusMessage + '</p>';
    
    mailer({
        from: config.GmailAuth.email,
        to: config.sendToAddress, 
        subject: res.website + ' is down',
        body: msg
    }, 
    
    function (error, res) {
        if (error) {
            console.log('Failed to send email');
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
    "use strict"; 
    console.log(msg); 
}


module.exports.onStop = onStop;
module.exports.onDown = onDown;
module.exports.onError = onError;

