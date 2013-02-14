
var Ping = require('./lib/ping'),
    http = require('http'),
    websites = require('./websites'),
    monitors = [],
    port = process.env.PORT || 3008,
    server, App;



App = {
    pingServers: function () {
        var self = this;
        
        if (Array.isArray(websites) && websites.length > 0) {
            websites.forEach(function (website) {
                var monitor = new Ping ({
                    website: website.url,
                    timeout: website.timeout
                });
            
                monitors.push(monitor);
            });
            
            self.createServer();
        }
        else {
            self.createServer('Error - No websites are being monitored');
        }  
    },
    
    
    
    
    createServer: function (output) {
        server = http.createServer(function (req, res) {
            var data = output || ("Monitoring the following websites: \n \n" + websites.join("\n"));
            
            res.end(data);
        });
        
        server.listen(port);
        console.log('Listening to port %s', port);  
    }
};



/*
    Start pinging
*/    
App.pingServers();




