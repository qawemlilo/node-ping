
var request = require('request'),
    codeMsg = require('./http-status');




function Ping (opts) {
    this.website = '';
    this.timeout = 15;
    this.handle = null;
    this.time = 0;
    this.refresh = 3600000;
    
    this.init(opts);
}




Ping.prototype = {

    init: function (opts) {
        var self = this;
        
        self.website = opts.website;
        self.timeout = opts.timeout * 1000;
        self.refresh = opts.refresh * 1000;
        
        self.start();
    },

    
    
    
    ping: function () {
        var self = this, currentTime = Date.now();
        
        function handleResponse (error, res, body) {
            if (!error && res.statusCode === 200) {
                self.isOk();
            }
            else {
                slef.isNotOk(res.statusCode);   
            } 
        }
        
        if ((currentTime - self.time) >= self.refresh) {
            self.stop();
            
            return self.start();
        }
        
        process.nextTick(function () {
            try {
                request(self.website, handleResponse);
            }
            catch (err) {
                self.isNotOk();
            }
        });
    },
    
    
    

    isOk: function () {
        var time =  Date.now();
        
        console.log(time + ': ' + this.website);
        console.log('Status: UP');
        console.log('Message: OK');
        console.log(' ');
    },

    
    

    isNotOk: function (statusCode) {
        var time =  Date.now();
        
        console.log(time + ': ' + this.website);
        console.log('Status: DOWN');
        console.log('Message: ' + codeMsg[statusCode] || 'Null');
        console.log(' ');
    },
    
    
    
    
    start: function () {
        var self = this;
        
        self.time = Date.now();
        
        console.log(self.time + ': Pinging ' + self.website);
        console.log('=======================================================================>>');
        
        self.handle = setInterval(function () {
            self.ping();
        }, self.timeout); 
    },
    
    
    

    stop: function () {
        clearInterval(this.handle);  
    }    
};

module.exports = Ping;