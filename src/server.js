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
	}else if (parsedUrl.pathname === '/client2.html'){
	htmlHandler.getIndex2(request,response);
	}else if(parsedUrl.pathname === '/getFavorites'){
	jsonHandler.getFavorites(request,response);
	}else{
	jsonHandler.notPokemon(request,response);
	}
};

const handlePost = (request, response, parsedUrl) => {
	if (parsedUrl.pathname === '/addPokemon'){
		const res = response;
		let body = [];
		
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
		return jsonHandler.addPokemon(request,response,bodyParams);
		});
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