var Ping = require('../lib/ping'),
    should = require('should'), 
    website = {website: 'http://www.rflab.co.za', timeout: 0.2},
    config;


describe('Ping', function() {
    describe('#Ping', function() {
        it('should be start monitoring http://www.rflab.co.za', function(done) {
            var monitor = new Ping(website);
            
            monitor.timeout.should.be.eql(0.2 * (60 * 1000));
            monitor.website.should.be.eql('http://www.rflab.co.za');
            
            monitor.stop();
            
            done();
        });
    });    
});