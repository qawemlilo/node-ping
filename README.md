# A Node uptime monitor

Node-ping is a simple app that monitors the availabilty of your websites. 

**Note:** Node-ping uses GMail to send down-time nofication emails, you are required to create an [application specific password](https://accounts.google.com/IssuedAuthSubTokens) on your Gmail account and update the `config.json` file.

## How it works
 
1. Download the repo:

```
git clone https://github.com/qawemlilo/node-monitor
```

2. Create [an application specific password](https://accounts.google.com/IssuedAuthSubTokens) from your Gmail account and update the `config.json` file.

3. List all websites that you want to monitor in `websites.json` and run `node app` command to start monitoring your websites.


## Dependencies
 - [Node Mailer](https://github.com/andris9/Nodemailer) - for sending emails
 - [Node Monitor](https://github.com/qawemlilo/node-monitor) - is an uptime event emitter that was abstracted from Node-ping.


## License

(MIT License)

Copyright (c) 2013 Qawelesizwe Mlilo <qawemlilo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
