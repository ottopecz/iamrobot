const http = require('http');

const server = http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/place') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
});

server.listen(3000, () => console.log("Robby is awake"));