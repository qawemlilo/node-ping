var nodemailer = require('nodemailer'), 
    config = require('./config'), 
    mailer;


mailer = function (opts, fn) {

    var mailOpts, smtpTrans;

    // nodemailer configuration
    try {
        smtpTrans = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
                user: config.email,
                pass: config.password
            }
        });
    }
    catch (err) {
        fn(true, 'Nodemailer could not create Transport');
        return;
    }
    
    // mailing options    
    mailOpts = {
        from: config.email,
        replyTo: config.email,
        to: config.email,
        subject: opts.subject,
        html: opts.body
    };
    
    
    // Send maail
    try {    
        smtpTrans.sendMail(mailOpts, function (error, response) {
            //if sending fails
            if (error) {
            fn(true, error);
            }
            //Yay!! message sent
            else {
                fn(false, response.message);
            }
        });
    }
    catch (err) {
        fn('Nodemailer could not send Mail', '');   
    }
};

module.exports = mailer;
