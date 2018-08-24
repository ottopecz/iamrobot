#!/usr/bin/env node

const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/left',
  method: 'PUT',
  headers: {
    'Accept': 'text/html'
  }
};

const errMsg = 'An error occurred turning my direction';

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
      if (body === 'false') {
        console.log('Place me on the table. Like "place 0 0 NORTH"');
      }
    });
});

request.on('error', ({message}) => {
  console.error(`A problem occurred with the request: ${message}`);
});

request.end();