var Ping = require('./lib/ping'),
    websites = require('./websites'),
    http = require('http'),
    server,
    port = process.env.PORT || 3008, 
    monitors = [];
 
 
websites.forEach(function (website) {
    var monitor = new Ping ({
        website: website.url,
        timeout: website.timeout
    });
 
    monitors.push(monitor);
});
 
 
server = http.createServer(function (req, res) {
    var data = "Monitoring the following websites: \n \n" + websites.join("\n");
 
    res.end(data);
});
 
 
server.listen(port);
console.log('Listening to port %s', port);