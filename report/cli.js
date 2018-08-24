#!/usr/bin/env node

const http = require('http');
const querystring = require('querystring');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/report',
  method: 'GET',
  headers: {
    'Accept': 'text/html'
  }
};

const errMsg = 'An error occurred reporting my status';

const request = http.request(options, response => {
  if (response.statusCode !== 200) {
    console.error(errMsg);
    return;
  }

  response.setEncoding('utf8');

  let body;

  response
    .on('data', chunk => {
      body = chunk;
    })
    .on('end', () => {
      if (!body) {
        console.log('Place me on the table. Like "place 0 0 NORTH"');
        return;
      }

      const {x, y, facing} = querystring.parse(body);

      console.log(`My position is "x": ${x}, "y": ${y} and I'm facing ${facing}`);
    });
});

request.on('error', ({message}) => {
  console.error(`${errMsg}: ${message}`);
});

request.end();