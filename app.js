var Monitor = require('ping-monitor'),
    websites = require('./websites'),
    http = require('http'),
    port = process.env.PORT || 3008,
    mailer = require('./mailer'),
    config = require('./config'),
    server, urls = [], monitors = [];

    


var htmlMsg = function (obj) {
    "use strict";
    
    var html = '<p>Time: ' + obj.time;
    html +='</p><p>Website: ' + obj.website;
    html += '</p><p>Message: ' + obj.statusMessage + '</p>';
    
    return html;
};



    
websites.forEach(function (website) {
    "use strict";
    
    var monitor = new Monitor ({
        website: website.url,
        timeout: website.timeout
    });  
    
    monitor.on('error', function (msg) {
        console.log(msg);
    });
    
    
    monitor.on('stop', function (website) {
        mailer({
            from: config.GmailAuth.email,   // you may change this
            to: config.sendToAddress,     // you may change this 
            subject: website + ' monitor has stopped',
            body: '<p>' + website + ' is no longer being minitored.</p>'
        }, function (error, res) {
            if (error) {
                console.log('Failed to send email');
            }
            else {
                console.log(res.message);    
            }
        });
    });
    
    monitor.on('down', function (res) {
        var msg = htmlMsg(res);
        
        mailer({
            from: config.GmailAuth.email,   // you may change this
            to: config.sendToAddress,     // you may change this 
            subject: res.website + ' is down',
            body: msg
        }, function (error, res) {
            if (error) {
                console.log('Failed to send email');
            }
            else {
                console.log(res.message);    
            }
        });
    });
    
    urls.push(website.url);
    monitors.push(monitor);
});




server = http.createServer(function (req, res) {
    var body = urls.join('\n');
    res.end(body);
});
 
 
server.listen(port);
console.log('Listening to port %s', port);

