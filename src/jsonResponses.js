const pokeManager = require('./PokemonManager.js');

const chinPokeManager = new pokeManager.PokemonManager();

const users = [];
const maxPokemon = 802;
// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// return user object as JSON
const getPokemon = (request, response, id) => {
  const pokemonData = chinPokeManager.getPokemon(id);

  let responseJSON = {
    users,
  };
  let responseCode;
  // IF REQUEST METHOD == GET THE RUN THE GET RESPONSE
  if (request.method === 'GET') {
    if (id <= maxPokemon) {
      return pokemonData.then(data => respondJSON(
        request, response, 200,
        {
          id: data.id,
          name: data.name,
          img: data.sprites.front_shiny,
          types: data.types,
        },
      ));
      // return respondJSON(request, response, 200);
    } else if (id > maxPokemon) {
      responseJSON = ' Pokemon Not Found';
      responseCode = 404;
      return respondJSON(request, response, responseCode, responseJSON);
    }
    responseJSON = 'Bad Request';
    responseCode = 400;
    return respondJSON(request, response, responseCode, responseJSON);


    // IF THE REQUEST METHOD ISNT GET THEN WE RUN THE HEAD RESPONSE
  } else if (request.method === 'HEAD') {
    return respondJSONMeta(request, response, 200);
  }
  return respondJSON(request, response, 400);
};

const notPokemon = (request, response) => {
  // IF THE PERSON REQUESTS A PAGE THAT DOESNT EXIST
  const responseJSON = {
    message: '404 Page Not Found',
  };
  return respondJSON(request, response, 404, responseJSON);
};

const getFavorites = (request, response) => {
  // GET THE FAVORITES THAT THE USER SELECTED FROM THE POKEDEX
  const responseJSON = {
    users,
  };
  let responseCode = 200;

  if (request.method === 'GET') {
    return respondJSON(request, response, responseCode, responseJSON);
  }
  responseCode = 400;
  responseJSON.message = 'Bad Request';


  return respondJSON(request, response, responseCode, responseJSON);
};
// GetPokemonFull
// Look up multi user application in node


const addPokemon = (request, response, body) => {
  // ADD THE POKEMON THAT THE USER SELECTED FROM THE STORED DATA
  const responseJSON = {
    message: 'Pokemon Added',
  };
  const responseCode = 201;
  if (users.indexOf(body.id) === -1) {
    users.push(body.id);
    return respondJSON(request, response, responseCode, responseJSON);
  }

  users.splice(users.indexOf(body.id), 1);
  responseJSON.message = 'Pokemon Removed';
  return respondJSON(request, response, responseCode, responseJSON);
};


// public exports
module.exports = {
  getPokemon,
  addPokemon,
  notPokemon,
  getFavorites,
};
