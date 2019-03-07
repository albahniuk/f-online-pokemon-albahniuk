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
      urlPokemon: []
    }

    this.getFilteredPokemon = this.getFilteredPokemon.bind(this);
    this.filterPokemon = this.filterPokemon.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
    this.getInfoPokemon = this.getInfoPokemon.bind(this);
  }

  getPokemon(){
    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        const newPokemon = data.results.map((item, index) => {
          return {...item, id: index};
        })
        const urlPokemon = data.results.map((item) => 
          this.state.urlPokemon.push(item.url)
        );
        this.setState({
          pokemon: newPokemon
        })
      })
      this.getInfoPokemon();
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

  getInfoPokemon() {
    const { urlPokemon } = this.state;
    console.log(urlPokemon);

    Promise.all(urlPokemon.map(url => fetch(url)))
      .then(responses => Promise.all(
        responses.map(r => r.json())
      ))
      .then(pokemons => {
        pokemons.map(pokemon => console.log(pokemon))
      });

  }

  getFilteredPokemon(){
    const {pokemon, filteredPokemon} = this.state;

    return pokemon.filter(item => item.name.toUpperCase().includes(filteredPokemon.toUpperCase()));
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <label>Busca un Pokemon:</label>
          <input type="text" onKeyUp={this.filterPokemon}/>
        </header>
        <main className="app-main">
            <PokemonList filteredPokemon={this.getFilteredPokemon()}/>
        </main>
      </div>
    );
  }
}

export default App;
