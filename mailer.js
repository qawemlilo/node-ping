"use strict";

const Mailgun = require('mailgun-js');
const config = require('./config');
const subject = 'Website Down';
const emailFooter = '<br><br><br><a href="http://node-ping.herokuapp.com">Ping Monitor</a>';



module.exports.sendEmail = function(opts, fn) {

  let mailgun = new Mailgun({
    apiKey: config.mailgun.apiKey,
    domain: config.mailgun.domain
  });

  let data = {
    from: config.mailgun.email,
    to: config.deliveryEmail,
    subject: opts.subject || subject,
    html: opts.body + emailFooter
  };

  mailgun.messages().send(data, fn);
};
