const http = require("http");
const https = require("https");

class ApiManager{
	constructor (baseUrl, apiUri, key){
		this.baseUrl = baseUrl;
		this.apiUri = apiUri;
		this.key = key;
	}
	
	/**
	Sending a get request.
	@param uri target endpoint.
	@param success sucess callback
	@param failure failure callback 
	*/
	get(uri){
		return new Promise((resolve, reject) => {
			var options = {
				host: this.baseUrl,
				protocol: 'https:',
				path: this.apiUri + uri,
				method: "GET"
			};
			
			let req = https.request(options, (res) => {
				res.setEncoding('utf8');
				
				let data = '';	
				
				res.on('data', (chunk) => {
					data += chunk;
				});
				
				res.on("end", () => {
					resolve(JSON.parse(data));
				});
				
				res.on("error", (e) => {
					reject(e);
				});
			});
			
			req.end();	
		});
			

	}
	
	post(uri){
	
	}
	
	head(uri){
	
	}
	
}

module.exports = {
	ApiManager,	
};

/*
var api = new ApiManager("pokeapi.co", "fasdfsadfsad");
var bulbasaur = api.get("pokemon/1");
*/