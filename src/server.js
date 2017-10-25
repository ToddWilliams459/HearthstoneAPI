const url = require('url');
const http = require('http');

const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3303;
// Const to handle our get requests
const handleGet = (request, response, parsedUrl) => {
  const param = Number(parsedUrl.pathname.substring(1));

  if (parsedUrl.pathname === '/css/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (!Number.isNaN(param)) {
    jsonHandler.getPokemon(request, response, parsedUrl.pathname.substring(1));
  } else if (parsedUrl.pathname === '/css/bootstrap.css') {
    htmlHandler.getBootstrap(request, response);
  } else if (parsedUrl.pathname === '/client2.html') {
    htmlHandler.getIndex2(request, response);
  } else if (parsedUrl.pathname === '/getFavorites') {
    jsonHandler.getFavorites(request, response);
  } else {
    jsonHandler.notPokemon(request, response);
  }
};
// Const to handle our posting requests
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addPokemon') {
    const res = response;
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      console.log(bodyString);
      const bodyParams = JSON.parse(bodyString);
      return jsonHandler.addPokemon(request, response, bodyParams);
    });
  }
};
// Const called on request that will later call handlePost or HandleGet
const onRequest = (request, response) => {
  const parseUrl = url.parse(request.url);


  if (request.method === 'POST') {
    handlePost(request, response, parseUrl);
  } else {
    handleGet(request, response, parseUrl);
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
