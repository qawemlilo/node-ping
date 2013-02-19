var Ping = require('./lib/ping'),
    websites = require('./websites'),
    http = require('http'),
    server,
    port = process.env.PORT || 3008,
    urls = [],    
    monitors = [];
    
 
 
websites.forEach(function (website) {
    var monitor = new Ping ({
        website: website.url,
        timeout: website.timeout
    });
    
    urls.push(website.url);
    monitors.push(monitor);
});
 
 
server = http.createServer(function (req, res) {
    var data = "Monitoring the following websites: \n \n" + url.join("\n");
 
    res.end(data);
});
 
 
server.listen(port);
console.log('Listening to port %s', port);