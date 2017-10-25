const pokeManager = require("./PokemonManager.js");
let chinPokeManager = new pokeManager.PokemonManager();

const users = [];
const maxPokemon = 802;
var modified = true;
// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  console.log(object);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request,response,status) => {
	response.writeHead(status, { 'Content-Type': 'application/json' });
	response.end();
};

// return user object as JSON
const getPokemon = (request, response,id) => {
  let pokemonData = chinPokeManager.getPokemon(id);
  
  var responseJSON = {
    users,
  };
	//IF REQUEST METHOD == GET THE RUN THE GET RESPONSE
	if (request.method === 'GET') {
	  if(id <= maxPokemon) {
		pokemonData.then((data)=>{
			console.log(data);
			respondJSON(request, response, 200, 
	  {
		id:data.id,
		name:data.name,
		img:data.sprites.front_shiny,
		types:data.types})});
	   
	  }else if(id > maxPokemon){
		responseJSON = " Pokemon Not Found";
		let responseCode = 404;
	    return respondJSON(request,response,responseCode,responseJSON); 
	  }else {
		responseJSON = "Bad Request";
		let responseCode = 400;
		return respondJSON(request,response,responseCode,responseJSON);
	  }
	  //IF THE REQUEST METHOD ISNT GET THEN WE RUN THE HEAD RESPONSE
	}else if (request.method === 'HEAD') {
		respondJSONMeta(request,response,200);
	}	
};

const notPokemon = (request,response) => {
	//IF THE PERSON REQUESTS A PAGE THAT DOESNT EXIST
	const responseJSON = {
		message: '404 Page Not Found',
	};
	return respondJSON(request,response,404,responseJSON);
};

const getFavorites = (request, response) => {
	//GET THE FAVORITES THAT THE USER SELECTED FROM THE POKEDEX
	const responseJSON = {
		users,
	};
	let responseCode = 200;

	if (request.method === 'GET') {
		return respondJSON(request,response,responseCode,responseJSON);
	}
};
//GetPokemonFull
//Look up multi user application in node


const addPokemon = (request, response, body) => {
	//ADD THE POKEMON THAT THE USER SELECTED FROM THE STORED DATA
	const responseJSON = {
		message: 'Pokemon Added',
	};
	let responseCode = 201;
	if(users.indexOf(body.id) == -1){
		users.push(body.id);
		console.log(users);
		return respondJSON(request,response,responseCode,responseJSON);
	}
	else{
		users.splice(users.indexOf(body.id),1);
		console.log(users);
		responseJSON.message = 'Pokemon Removed';
		return respondJSON(request,response,responseCode,responseJSON);
	}

	
};


// public exports
module.exports = {
  getPokemon,
  addPokemon,
  notPokemon,
  getFavorites,
};