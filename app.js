
var Ping = require('./lib/ping'),
    rflab,
    sanp;


    
rflab = new Ping({
    website: 'http://www.rflab.co.za',
    timeout: 20
});


sanp = new Ping({
    website: 'http://www.sanatural.co.za/home',
    timeout: 30
});

