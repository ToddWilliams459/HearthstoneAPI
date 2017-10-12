const apiManager = require("./ApiManager.js");

class PokemonManager {
	constructor() {
		this.apiHandler = new apiManager.ApiManager("pokeapi.co", "/api/v2/");
	}
	
	getBerry(id){
		return this.apiHandler.get("berry/" + id + "/");
	}
	
	getContest(id){
		return this.apiHandler.get("contests/" + id + "/");
	}
	
	getEncounter(){
		return this.apiHandler.get("encounters/" + id + "/");
	}
	
	getEvolution(){
		return this.apiHandler.get("evolution/" + id + "/");
	}
	
	getGames() {
		return this.apiHandler.get("games/" + id + "/");
	}
	
	getItems(){
		return this.apiHandler.get("items/" + id + "/");
	}
	
	getMachines(){
		return this.apiHandler.get("machines/" + id + "/");
	}
	
	getMoves(){
		return this.apiHandler.get("moves/" + id + "/");	
	}
	
	getLocations(){
		return this.apiHandler.get("locations/" + id + "/");
	}
	
	getPokemon(id){
		return this.apiHandler.get("pokemon/" + id + "/");
	}
	
	getUtility(){
		return this.apiHandler.get("utility/" + id + "/");
	}
	
	
}

module.exports = {
	PokemonManager
};