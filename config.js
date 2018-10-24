"use strict"


const envVars = require('./.env');


module.exports = {
  mailgun: {
    apiKey: envVars.apiKey,
    domain: envVars.domain,
    email: envVars.email
  },
  deliveryEmail: envVars.deliveryEmail
};
