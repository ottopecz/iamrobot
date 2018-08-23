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

const req = http.request(options, (res) => {
  res.setEncoding('utf8');

  let body;

  res.on('data', (chunk) => {
    body = chunk;
  });

  res.on('end', () => {

    if (!body) {
      console.log('Place me on the table. Like "place 0 0 NORTH"');
      return;
    }

    const {x, y, facing} = querystring.parse(body);

    console.log(`My x coordinate is ${x}, my y coordinate is ${y} and I'm facing ${facing}`);
  });
});

req.on('error', ({ message }) => {
  console.error(`A problem occurred with the request: ${message}`);
});

req.end();