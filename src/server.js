const url = require("url");
const http = require("http");
const query = require("querystring");

const jsonHandler = require("./jsonResponses.js");
const htmlHandler = require("./htmlResponses.js");

const port = process.envPORT || process.env.NODE_PORT || 3303;

const handleGet = (request, response, parsedUrl) => {
	let param = Number(parsedUrl.pathname.substring(1));
	
	if(parsedUrl.pathname === '/css/style.css' ){
	htmlHandler.getCSS(request,response);		
	} else if (parsedUrl.pathname === '/') {
	htmlHandler.getIndex(request,response);
	}  else if (!Number.isNaN(param)){
	jsonHandler.getPokemon(request,response, parsedUrl.pathname.substring(1));
	} else if (parsedUrl.pathname === '/css/bootstrap.css') {
	htmlHandler.getBootstrap(request,response);
	}else{
	htmlHandler.getIndex(request,response);
	}
};

const onRequest = (request, response) => {
	let parseUrl = url.parse(request.url);
	let queryParam = query.parse(parseUrl.query);

	//let api = new pokeManager.PokemonManager();
	//api.getBerry(1)
	//	.then((data) => console.log(data))
		//.catch((err) => console.log(err));
		
	if (request.method === 'POST') {
    handlePost(request, response, parseUrl);
  } else {
    handleGet(request, response, parseUrl);
  }

};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);


/*
From my site mirror whats on the API.
Login system!
Save collections? (Use SQLLite Database)


*/