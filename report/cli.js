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

const req = http.request(options, (res) => {
  if (res.statusCode !== 200) {
    console.error(errMsg);
    return;
  }

  res.setEncoding('utf8');

  let body;

  res
    .on('data', (chunk) => {
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

req.on('error', ({ message }) => {
  console.error(`${errMsg}: ${message}`);
});

req.end();