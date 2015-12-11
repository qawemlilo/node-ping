"use strict"

var Monitor = require('ping-monitor');
var websites = require('./websites');
var http = require('http');
var port = process.env.PORT || 3008;
var events = require('./events');
var urls = [];
var monitors = [];


/*
   Loop over all websites and create a Monitor instance for each one.
*/
websites.forEach(function (website) {
  
    var monitor = new Monitor ({
        website: website.url,
        interval: website.interval
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
    res.end(urls.join('\n'));
}).listen(port);

console.log('Listening to port %s', port);
