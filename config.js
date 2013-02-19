/*
   This application requires that you create an app specific password on your Gmail account.
   Save your email address in the GmailAuth.email property and your app specific password in the GmailAuth.password property.
   
   The sendToAddress property requires the email address to send all error messages to.
*/

module.exports = {
    GmailAuth: {
        email: 'your-handle@gmail.com',
        password: 'xxxxxxxxxxxx'
    },
    
    sendToAddress: 'email-address-to-send-downtime-messages-to'
};