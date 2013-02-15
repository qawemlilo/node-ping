
var request = require('request'),
    statusCodes = require('http').STATUS_CODES,
    mailer = require('./mailer');


/*
    Ping Constructor
*/

function Ping (opts) {
    // hold website to be monitored
    this.website = '';
    
    // frequency of pings in minutes
    this.timeout = 15;
    
    // interval handler
    this.handle = null;
    
    // holds start time
    this.startTime = 0;
    
    // holds amount of time for refresh
    this.refresh = 3600000;
    
    // repeat flag
    this.repeat = true;
    
    
    // Start monitoring
    this.init(opts);
    
    return this;
}



Ping.prototype = {

    init: function (opts) {
        var self = this;
        
        self.website = opts.website;
        
        self.timeout = (opts.timeout * (60 * 1000));
        
        if (opts.hasOwnProperty('repeat') && !opts.repeat) { 
            self.startTime = Date.now();
            self.ping();
        }
        else {
            self.start();  
        }
    },
    
    
    

    
    
    
    ping: function () {
        var self = this, currentTime = Date.now();
        
        function handleResponse (error, res, body) {
            // Website is up
            if (!error && res.statusCode === 200) {
                self.isOk();
            }
            
            // No error but website not ok
            else if (!error) {
                self.isNotOk(res.statusCode);   
            }
            
            // Ping error
            else {
                self.isNotOk();
            }
        }
        
        // Refresh after a certain amount of time
        if ((currentTime - self.startTime) >= self.refresh) {
            console.log('restarting');
            self.stop();
            
            return self.start();
        }
        
        process.nextTick(function () {
            try {
                // send request
                request(self.website, handleResponse);
            }
            catch (err) {
                self.isNotOk();
            }
        });
    },
    
    
    
    
    
    
    

    isOk: function () {
        this.log('UP', 'OK');
    },
    
    

    
    

    isNotOk: function (statusCode) {
        var time =  Date.now(), 
            self = this,
            time = self.getFormatedDate(time),
            msg = (statusCodes[statusCode + ''] || 'Null'),
            
            htmlMsg = '<p>Time: ' + time;
            htmlMsg +='</p><p>Website: ' + self.website;
            htmlMsg += '</p><p>Message: ' + msg + '</p>';
        
        this.log('DOWN', msg);
        
        // Send admin and email
        mailer({
            from: 'uptime-robot@rflab.co.za',
            to: 'qawemlilo@gmail.com',
            subject: self.website + ' is down',
            body: htmlMsg
        }, function (error, res) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(res.message || 'Failed to send email');
            }   
        });
    },
    
    
    
    
    
    
    start: function () {
        var self = this;
        
        // set starting time
        self.startTime = Date.now();
        
        console.log("\nTime: " + self.getFormatedDate(self.startTime) + "\nPinging: " + self.website + "\n==========================================================>> \n");
        
        // create an interval for pings
        self.handle = setInterval(function () {
            self.ping();
        }, self.timeout); 
    },
    
    
    
    
    

    stop: function () {
        // stop ping
        clearInterval(this.handle);
        this.handle = null;        
    },




    log: function (status, msg) {
        var self = this, 
            time = Date.now(), 
            output = '';
            
        time = self.getFormatedDate(time);
        
        output += "\nWebsite: " + self.website;
        output += "\nTime: " + time;
        output += "\nStatus: " + status;
        output += "\nMessage:" + msg  + "\n";
        
        console.log(output);
    },
    
    



    getFormatedDate: function (time) {
        var currentDate = new Date(time);
  
        currentDate = currentDate.toISOString();
        currentDate = currentDate.replace(/T/, ' ');
        currentDate = currentDate.replace(/\..+/, ''); 

        return currentDate;
    }     
};

module.exports = Ping;
