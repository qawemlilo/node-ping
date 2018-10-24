# A Node uptime monitor

Node-ping is a simple app that monitors the availability of your websites.

It uses [node-monitor](https://github.com/qawemlilo/node-monitor) to ping your websites at regular intervals and [mailgun-js](https://www.npmjs.com/package/mailgun-js) to send emails.

### How it works

1. Download the repo: `git clone https://github.com/qawemlilo/node-ping.git`

2. Cd into the repo and install npm packages: `cd node-ping && npm install`

3. Rename `env.blank.js` to `env.js` and fill in the mailing config (we're using Mailgun).

4. List all websites that you want to monitor in `websites.js`. The `interval` property is the polling interval in minutes.  

5. Run `npm start` command to start monitoring your websites.


## Dependencies
 - [mailgun-js](https://www.npmjs.com/package/mailgun-js) - for sending emails
 - [node-monitor](https://github.com/qawemlilo/node-monitor) - an uptime event emitter.


## License

(MIT License)

Copyright (c) 2013 - 2018 Qawelesizwe Mlilo <qawemlilo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
