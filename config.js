/*
   This application reqires that you create an app specific password on your gmail account.
   Save you email address in GmailAuth.email and your app specific password in GmailAuth.password
   
   The sendToAddress requires the email address to send all error messages to.
*/

module.exports = {
    GmailAuth: {
        email: 'your-handle@gmail.com',
        password: 'xxxxxxxxxxxx'
    },
    
    sendToAddress: 'email-address-to-send-downtime-messages-to'
};