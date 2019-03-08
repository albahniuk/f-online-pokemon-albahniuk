import React, { Component } from 'react';
import './App.scss';
import PokemonList from './components/PokemonList';

const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/?limit=3&offset=0';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      filteredPokemon: '',
      infoPokemon: [],
    }

    this.getFilteredPokemon = this.getFilteredPokemon.bind(this);
    this.filterPokemon = this.filterPokemon.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
  }

  getPokemon() {
    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
        const promiseList = data.results.map(item => fetch(item.url));

        Promise.all(promiseList)
          .then(responses => {
            const res = responses.map(response => response.json())
            Promise.all(res)
              .then(pokemon => {
                this.setState({
                  infoPokemon: pokemon
                })
                console.log(this.state.infoPokemon);
              })
          })
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
    const {infoPokemon, filteredPokemon} = this.state;
    console.log(this.state.infoPokemon);
    return infoPokemon.filter(item => item.name.toUpperCase().includes(filteredPokemon.toUpperCase()));
    
  }

  render() {
    const { infoPokemon } = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <label>Busca un Pokemon:</label>
          <input type="text" onKeyUp={this.filterPokemon}/>
        </header>
        <main className="app-main">
          <PokemonList filteredPokemon={this.getFilteredPokemon()} infoPokemon={infoPokemon}/>
        </main>
      </div>
    );
  }
}

export default App;
