

"use strict";

var Ping = require('ping-monitor');
var http = require('http');
var websites = require('./websites');
var mailer = require('./mailer');
var router = require('./router');
var monitors = [];
var port = process.env.PORT || 3008;
var urls = [];



function pingServers() {

  // Iterate through websites and create a ping monitor for each website
  websites.forEach(function (website) {
    
    var monitor = new Ping ({
      website: website.url,
      timeout: website.timeout
    });
    
    
    var emitHandler = function(res) {
      mailer.sendEmail({
        subject: res.website + ' is down',
        body: '<p>Time: ' + monitor.getFormatedDate(res.time) + '</p><p>Website: ' + res.website + ' </p><p>Message: ' + res.statusMessage + ' </p>'
      }, 
      function (err, message) {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(res.website + ' is down. Email sent!');
        }
      });                  
    }; 
                
    monitor.on('down', emitHandler);
    monitor.on('error', emitHandler);
    
        
    urls.push(website.url);
    monitors.push(monitor);
  }); 
}

    
// start monitoring servers   
pingServers();


// create web server
var server = http.createServer(router(urls));

server.listen(port);
console.log('Listening to port %s', port); 




