import React, { Component } from 'react';
import './App.scss';
import PokemonList from './components/PokemonList';

const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/?limit=3&offset=0';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokemon: [],
      filteredPokemon: '',
      urlPokemon: [],
      imagesPokemon: [],
      skillsPokemon: [],
      idPokemon: []
    }

    this.getFilteredPokemon = this.getFilteredPokemon.bind(this);
    this.filterPokemon = this.filterPokemon.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
  }

  getPokemon(){
    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        const newPokemon = data.results.map((item, index) => {
          return {...item, id: index};
        })
        this.setState({
          pokemon: newPokemon
        })

        data.results.map((item) => 
          this.state.urlPokemon.push(item.url)
        );

        Promise.all(this.state.urlPokemon.map(url => fetch(url)))
        .then(responses => Promise.all(
          responses.map(r => r.json())
        ))
        .then(
          pokemons => {
          pokemons.map(pokemon => {
            const name = pokemon.name;
            const image = pokemon.sprites.front_default;
            const skills = pokemon.abilities;
            const id = pokemon.id;
            this.setState({
              imagesPokemon: image,
              skillsPokemon: skills,
              idPokemon: id
            })
            console.log(name);
            console.log(image);
            console.log(skills);
            console.log(id);
          })
        });
  
      })
  }

  componentDidMount(){
    this.getPokemon()
  }

  filterPokemon(e){
    const query = e.currentTarget.value;
    this.setState({
      filteredPokemon: query
    })
  }

  getFilteredPokemon(){
    const {pokemon, filteredPokemon} = this.state;

    return pokemon.filter(item => item.name.toUpperCase().includes(filteredPokemon.toUpperCase()));
  }

  render() {
    const {idPokemon, imagesPokemon, skillsPokemon} = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <label>Busca un Pokemon:</label>
          <input type="text" onKeyUp={this.filterPokemon}/>
        </header>
        <main className="app-main">
            <PokemonList filteredPokemon={this.getFilteredPokemon()} idPokemon={idPokemon} imagesPokemon={imagesPokemon} skillsPokemon={skillsPokemon}/>
        </main>
      </div>
    );
  }
}

export default App;
