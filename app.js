
var Ping = require('./lib/ping'),
    http = require('http'),
    websites = [
        'http://www.rflab.co.za', 
        'http://www.bookmarkmanager.co.za', 
        'http://crushit-compiler.herokuapp.com' 
    ],
    pingServers,
    monitors = [],
    port,
    server;


pingServers = function (arr) {
    if (Array.isArray(arr) && arr.length > 0) {
        arr.forEach(function (url) {
            var monitor = new Ping ({
                website: url,
                timeout: 15
            });
            
            monitors.push(monitor);
        });
    }    
}

    
pingServers(websites);
port = process.env.PORT || 3008;

server = http.createServer(function (req, res) {
    var data = websites.join("\n");
    res.end("Monitoring the following websites: \n \n" + data);    
});

server.listen(port);
console.log('Listening to port %s', port);

