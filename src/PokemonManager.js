const apiManager = require('./ApiManager.js');

class PokemonManager {
  constructor() {
    this.apiHandler = new apiManager.ApiManager('pokeapi.co', '/api/v2/');
  }

  // Using the pokemon ID to get the pokemon from the API
  getPokemon(id) {
    return this.apiHandler.get(`pokemon/${id}/`);
  }
}

module.exports = {
  PokemonManager,
};
