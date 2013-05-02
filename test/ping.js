var Monitor = require('ping-monitor'),
    should = require('should'), 
    website = {website: 'http://www.rflab.co.za', timeout: 0.2},
    config;


describe('Monitor', function() {
    describe('#Monitor', function() {
        it('should be start monitoring http://www.rflab.co.za', function(done) {
            var monitor = new Monitor(website);
            
            monitor.timeout.should.be.eql(0.2 * (60 * 1000));
            monitor.website.should.be.eql('http://www.rflab.co.za');
            
            monitor.stop();
            
            done();
        });
    });    
});