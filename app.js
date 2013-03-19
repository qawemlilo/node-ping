var Ping = require('./lib/ping'),
    websites = require('./websites'),
    http = require('http'),
    server,
    port = process.env.PORT || 3008,
    urls = [],    
    monitors = [],
    fs = require('fs'),
    logfile = './node-ping.log',
    
getFormatedDate = function (time) {
    var currentDate = new Date(time);
    
    currentDate = currentDate.toISOString();
    currentDate = currentDate.replace(/T/, ' ');
    currentDate = currentDate.replace(/\..+/, '');
 
    return currentDate;
};
 
 
websites.forEach(function (website) {
    var monitor = new Ping ({
        website: website.url,
        timeout: website.timeout
    });
    
    urls.push(website.url);
    monitors.push(monitor);
});
 
 
server = http.createServer(function (req, res) {
    // Check if a log file exists
    if (!fs.existsSync(logfile)) {
        return res.end("No downtime errors have been logged :) \n");
    }
    
    var logs = fs.readFileSync(logfile), // get the contents of the file
        header = "DOWN TIME LOGS: \n",
        data;
    
    // create an array of logs and format each log as well as the date
    data = logs.toString().split("\n").map(function (log) { 
        log = log.split(','); // create an array of a log
      
        log[0] = getFormatedDate(parseInt(log[0])); // format the date
        
        return log.join(" \t"); // return the log as a string
    }).join("\n");

    header += "--------------------------------------------------------------------------------------- \n"; 
 
    res.end(header + data);
});
 
 
server.listen(port);
console.log('Listening to port %s', port);