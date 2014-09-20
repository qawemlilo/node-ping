(function () {

"use strict";

var Ping = require('ping-monitor');
var http = require('http');
var websites = require('./websites');
var mailer = require('./mailer');
var router = require('./router');
var monitors = [];
var port = process.env.PORT || 3008;
var server;
var App;
var urls = [];



App = {
    pingServers: function () {
        var self = this;
        
        // Iterate through websites and create a ping monitor for each website
        websites.forEach(function (website) {
        
            var monitor = new Ping ({
                website: website.url,
                timeout: website.timeout
            }),
            
            emitHandler;
            

            emitHandler = function(res) {
                mailer({
                    subject: res.website + ' is down',
                    body: '<p>Time: ' + monitor.getFormatedDate(res.time) + '</p><p>Website: ' + res.website + ' </p><p>Messge: ' + res.statusMessage + ' </p>'
                }, function (err, message) {
                    if (err) {
                        console.log('Error! email not sent.')
                    }
                    else {
                        console.log(message);
                    }
                });                  
            }; 
                        
            monitor.on('down', emitHandler);
            monitor.on('error', emitHandler);
            
                
            urls.push(website.url);
            monitors.push(monitor);
        });
        
        // Once the monitors have been set let's create a server        
        self.createServer(); 
    },
    
    
    
    
    createServer: function () {
        server = http.createServer(router());
        
        server.listen(port);
        console.log('Listening to port %s', port);  
    }
};



/*
    Start pinging
*/    
App.pingServers();
}());




