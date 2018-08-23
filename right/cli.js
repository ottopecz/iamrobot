#!/usr/bin/env node

const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/right',
  method: 'PUT',
  headers: {
    'Accept': 'text/html'
  }
};

const errMsg = 'An error occurred turning my direction';

const req = http.request(options, (res) => {
  if (res.statusCode !== 200) {
    console.error(errMsg);
    return;
  }

  res.setEncoding('utf8');

  let body;

  res.on('data', (chunk) => {
    body = chunk;
  });

  res.on('end', () => {

    if (body === 'false') {
      console.log('Place me on the table. Like "place 0 0 NORTH"');
    }
  });
});

req.on('error', ({ message }) => {
  console.error(`A problem occurred with the request: ${message}`);
});

req.end();