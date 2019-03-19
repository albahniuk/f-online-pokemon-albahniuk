const ENDPOINT = "https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0";

const fetchPokemon = () => fetch(ENDPOINT).then(response => response.json());

const getPokemonDetail = async (pokemon) => {
    const pokeResponse = await fetch(pokemon.url)
    return pokeResponse.json()
}

const getPokemon = async() => {
    const pokemonList = await fetchPokemon()
    const list = await Promise.all(pokemonList.results.map(pokemon => getPokemonDetail(pokemon)))
    return list
    // OLD WAY:
    //   .then(data => {
    //     const promiseList = data.results.map(item => fetch(item.url));
    //     Promise.all(promiseList)
    //       .then(responses => {
    //         const res = responses.map(response => response.json())
    //         Promise.all(res)
    //           .then(pokemon => {
    //             this.setState({
    //               infoPokemon: pokemon
    //             })
    //           })
    //       })
    //   })
}

export { getPokemon };