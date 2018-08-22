const http = require('http');

const state = {
};

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/place') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(3000);