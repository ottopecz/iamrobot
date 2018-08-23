#!/usr/bin/env node

const http = require('http');
const querystring = require('querystring');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/move',
  method: 'PUT',
  headers: {
    'Accept': 'text/html'
  }
};

const errMsg = 'An error occurred changing my position';

const request = http.request(options, response => {
  if (response.statusCode !== 200) {
    console.error(errMsg);
    return;
  }

  response.setEncoding('utf8');

  let body ;

  response
    .on('data', (chunk) => {
      body = chunk;
    })
    .on('end', () => {
      const {success, isSet} = querystring.parse(body);

      if (success === 'false' && isSet === 'false') {
        console.log('Place me on the table. Like "place 0 0 NORTH"');
        return;
      }

      if (success === 'false' && isSet === 'true') {
        console.log('No way, Jose');
      }
    });
});

request.on('error', ({ message }) => {
  console.error(`A problem occurred with the request: ${message}`);
});

request.end();