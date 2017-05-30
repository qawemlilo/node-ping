# A Node uptime monitor

[![Greenkeeper badge](https://badges.greenkeeper.io/qawemlilo/node-ping.svg)](https://greenkeeper.io/)

Node-ping is a simple app that monitors the availability of your websites.

## How it works

1. Download the repo: `git clone https://github.com/qawemlilo/node-ping.git`

2. Cd into the repo and install npm packages: `cd node-ping && npm install`

3. Update `config.json` and put your own email.

4. List all websites that you want to monitor in `websites.json`. The `interval` property is the polling interval in minutes.  

5. Run `node app` command to start monitoring your websites.

**Note:** You may want to change `mailer.js` to use a SMTP provider. Please checkout [Node Mailer](https://github.com/andris9/Nodemailer) for more details.

## Dependencies
 - [nodemailer](https://github.com/andris9/Nodemailer) - for sending emails
 - [node-monitor](https://github.com/qawemlilo/node-monitor) - an uptime event emitter.


## License

(MIT License)

Copyright (c) 2013 - 2015 Qawelesizwe Mlilo <qawemlilo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
