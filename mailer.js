

var Mailgun = require('mailgun-js');
var apiKey = 'key-5e9fqmyzepk16qxs2s9d5mhureq66xt3';
var domain = 'nodeza.co.za';
var deliveryInbox = 'qawemlilo@gmail.com';
var from_who = 'PingMonitor <info@nodeza.co.za>';
var subject = 'Website Down';
var emailFooter = '<br><br><br><a href="http://node-ping.herokuapp.com">Ping Monitor</a>';



module.exports.sendEmail = function(opts, fn) {

  var mailgun = new Mailgun({apiKey: apiKey, domain: domain});

  var data = {
    from: opts.from || from_who,
    to: deliveryInbox,
    subject: opts.subject || subject,
    html: opts.body + emailFooter
  };

  mailgun.messages().send(data, fn);
};
