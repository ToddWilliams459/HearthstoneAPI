const url = require("url");
const http = require("http");
const query = require("querystring");

const pokeManager = require("./PokemonManager.js");
const htmlHandler = require("./htmlResponses.js");

const port = process.envPORT || process.env.NODE_PORT || 80;

const onRequest = (request, response) => {
	let parseUrl = url.parse(request.url);
	let queryParam = query.parse(parseUrl.query);

	let api = new pokeManager.PokemonManager();
	api.getBerry(1)
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
		
	switch (parseUrl.pathname) {
		case '/':
		htmlHandler.getIndex(request,response);	
		break;
		case '/style.css':
		htmlHandler.getCSS(request,response);
		break;
		default:
		htmlHandler.getIndex(request,response);
		break;
	}
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);


/*
From my site mirror whats on the API.
Login system!
Save collections? (Use SQLLite Database)


*/