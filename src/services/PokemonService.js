const ENDPOINT = "https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0";

const fetchPokemon = () => fetch(ENDPOINT).then(response => response.json());

export {fetchPokemon};