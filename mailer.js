
/*
   Module for sending emails
*/

var nodemailer = require('nodemailer');


/*
    Mailer function

    @param - (Object) opts - mailing options
    @param - (Function) fn - callback function
*/
var mailer = function (opts, fn) {

    // Send maail
    try {
      var transporter = nodemailer.createTransport();

      transporter.sendMail({
        from: opts.from,
        to: opts.to,
        subject: opts.subject,
        html: opts.body
      });
    }
    catch (err) {
        fn('Nodemailer could not send Mail', '');
    }
};

module.exports = mailer;
