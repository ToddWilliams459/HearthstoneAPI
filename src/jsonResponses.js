const pokeManager = require("./PokemonManager.js");
let chinPokeManager = new pokeManager.PokemonManager();

const users = [];

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  console.log(object);
  response.write(JSON.stringify(object));
  response.end();
};

// return user object as JSON
const getPokemon = (request, response,id) => {
  let pokemonData = chinPokeManager.getPokemon(id);
  
  const responseJSON = {
    users,
  };
  if (request.method === 'GET') {
	  pokemonData.then((data)=>respondJSON(request, response, 200, 
	  {
		id:data.id,
		name:data.name,
		img:data.sprites.front_shiny,
		types:data.types}));
	  
      console.log(request.method);
  } else if (request.method === 'HEAD') {
    
  }
};

const getFavorites = (request, response) => {
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
  getFavorites,
};