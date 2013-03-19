var request = require('request'),
    mailer = require('./mailer'),
    statusCodes = require('http').STATUS_CODES,
    fs = require('fs'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;
 
/*
    Ping Constructor
*/
function Ping (opts) {
    // holds website to be monitored
    this.website = '';
 
    // ping intervals in minutes
    this.timeout = 15;
 
    // interval handler
    this.handle = null;
 
    // initialize the app
    this.init(opts);
    
    return this;
}


/*
    Inherit from EventEmitter
*/
util.inherits(Ping, EventEmitter);



/*
    Methods
*/
 
Ping.prototype.init = function (opts) {
    var self = this;
 
    self.website = opts.website;
 
    self.timeout = (opts.timeout * (60 * 1000));
 
        // start monitoring
    self.start();
};




Ping.prototype.start = function () {
    var self = this,
        time = Date.now();
 
    console.log("\nMonitoring: " + self.website + "\nTime: " + self.getFormatedDate(time) + "\n");
 
    // create an interval for pings
    self.handle = setInterval(function () {
        self.ping();
    }, self.timeout);
};




Ping.prototype.stop = function () {
    clearInterval(this.handle);
    this.handle = null;
};




Ping.prototype.ping = function () {
    var self = this, currentTime = Date.now();
 
    try {
        // send request
        request(self.website, function (error, res, body) {
            // Website is up
            if (!error && res.statusCode === 200) {
                self.isOk();
            }
 
            // No error but website not ok
            else if (!error) {
                self.isNotOk(res.statusCode);
            }
 
            // Loading error
            else {
                self.isNotOk();
            }
        });
    }
    catch (err) {
        self.isNotOk();
    }
};
 
 
 
 
Ping.prototype.isOk = function () {
    this.log('UP', 'OK');
    this.emit('up');
};




Ping.prototype.isNotOk = function (statusCode) {
    var time =  Date.now(),
        self = this,
        time = self.getFormatedDate(time),
        msg = statusCodes[statusCode + ''],
            
    config = require('../config'),
 
    htmlMsg = '<p>Time: ' + time;
    htmlMsg +='</p><p>Website: ' + self.website;
    htmlMsg += '</p><p>Message: ' + msg + '</p>';
 
    this.log('DOWN', msg);
    self.emit('down');
        
 
    // Send yourself an email
    mailer({
        from: config.GmailAuth.email,   // you may change this
        to: config.sendToAddress,     // you may change this 
        subject: self.website + ' is down',
        body: htmlMsg
    }, function (error, res) {
        if (error) {
            console.log('Failed to send email');
        }
        else {
            console.log(res.message);    
        }
    });
};




Ping.prototype.log = function (status, msg) {
    var self = this,
        time = Date.now(),
        consoleOutput = '',
        logOutput = '';
 
    consoleOutput += "\nWebsite: " + self.website;
    consoleOutput += "\nTime: " + self.getFormatedDate(time);
    consoleOutput += "\nStatus: " + status;
    consoleOutput += "\nMessage: " + msg  + "\n";
    
    logOutput += time + ',';
    logOutput += self.website + ',';
    logOutput += status + ',';
    logOutput += msg;
 
    if (status == 'DOWN') {
        self.fileLog(logOutput);
    }
    
    console.log(consoleOutput);
};


Ping.prototype.fileLog = function (logOutput) {
    var filename = 'node-ping.log';  
 
    fs.exists(filename, function (yes) {
        if (yes) {
            fs.appendFile(filename,  "\n" + logOutput, 'utf8', function (err) {});
        }
        else {
            fs.writeFile(filename,  logOutput, 'utf8', function (err) {});
        }
    });
};




Ping.prototype.getFormatedDate = function (time) {
    var currentDate = new Date(time);
    
    currentDate = currentDate.toISOString();
    currentDate = currentDate.replace(/T/, ' ');
    currentDate = currentDate.replace(/\..+/, '');
 
    return currentDate;
};




module.exports = Ping;

