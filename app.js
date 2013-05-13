
var Monitor = require('ping-monitor'),
    websites = require('./websites'),
    http = require('http'),
    port = process.env.PORT || 3008,
    events = require('./events'),
    urls = [], 
    monitors = [];



/*
   Loop over all websites and create a Monitor instance for each one.
*/    
websites.forEach(function (website) {
    "use strict";
    
    var monitor = new Monitor ({
        website: website.url,
        timeout: website.timeout
    });  
    
    monitor.on('error', events.onError);
    monitor.on('stop', events.onStop);
    monitor.on('down', events.onDown);
    
    urls.push(website.url);
    monitors.push(monitor);
});



/*
   Server for responding to http requests
*/
http.createServer(function (req, res) {
    "use strict";

    res.end(urls.join('\n'));
}).listen(port);

console.log('Listening to port %s', port);

