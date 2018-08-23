const http = require('http');
const querystring = require('querystring');

const {place, report, left, right, move} = require('./stateMachine');

function _parseBody(body) {
  const {x, y, facing} = querystring.parse(Buffer.concat(body).toString());
  const xInt = parseInt(x, 10);
  const yInt = parseInt(y, 10);

  return {x: xInt, y: yInt, facing};
}

function _handlePing(response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.end('OK\n');
}

function _handlePlace(request, response) {
  let body = [];
  request
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      const {x, y, facing} = _parseBody(body);

      place(x, y, facing);
      response.statusCode = 200;
      response.end();
    });
}

function _handleReport(response) {
  response.statusCode = 200;
  response.end(querystring.stringify(report()));
}

function _handleLeft(response) {
  response.statusCode = 200;
  response.end(left().toString());
}

function _handleRight(response) {
  response.statusCode = 200;
  response.end(right().toString());
}

function _handleMove(response) {
  response.statusCode = 200;
  response.end(querystring.stringify(move()));
}

const server = http.createServer((request, response) => {

  request.on('error', err => {
    console.error('request error: ', err);
    response.statusCode = 400;
    response.end();
  });

  response.on('error', err => {
    console.error('response error: ', err);
  });

  if (request.method === 'GET' && request.url === '/ping') {
    _handlePing(response);
  } else if (request.method === 'PUT' && request.url === '/place') {
    _handlePlace(request, response);
  } else if (request.method === 'GET' && request.url === '/report') {
    _handleReport(response);
  } else if (request.method === 'PUT' && request.url === '/left') {
    _handleLeft(response);
  } else if (request.method === 'PUT' && request.url === '/right') {
    _handleRight(response);
  } else if (request.method === 'PUT' && request.url === '/move') {
    _handleMove(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
});

server.listen(3000, () => console.log("Robby is awake"));