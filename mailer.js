

var Mailgun = require('mailgun-js');
var config = require('./config');
var subject = 'Website Down';
var emailFooter = '<br><br><br><a href="http://node-ping.herokuapp.com">Ping Monitor</a>';



module.exports.sendEmail = function(opts, fn) {

  var mailgun = new Mailgun({
    apiKey: config.mailgun.apiKey, 
    domain: config.mailgun.domain
  });

  var data = {
    from: config.mailgun.email,
    to: config.deliveryEmail,
    subject: opts.subject || subject,
    html: opts.body + emailFooter
  };

  mailgun.messages().send(data, fn);
};
