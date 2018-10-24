"use strict";


/*
 * List of website to be monitored
 * url -  website to be monitor
 * interval - polling interval in minutes
**/
module.exports = [
    {
        url: 'http://node-ping.herokuapp.com',
        interval: 15
    },
    {
        url: 'http://video-download.herokuapp.com',
        interval: 15
    },
    {
        url: 'https://nodeza.co.za',
        interval: 15
    },
    {
        url: 'https://blog.ragingflame.co.za',
        interval: 12
    },
    {
        url: 'https://ragingflamesolutions.co.za',
        interval: 15
    },
    {
        url: 'https://nodetube.ragingflame.co.za',
        interval: 15
    }
];
