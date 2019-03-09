import React, { Component } from 'react';
import './App.scss';
import PokemonList from './components/PokemonList';
import {fetchPokemon} from './services/PokemonService';
import Filter from './components/Filter';

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
  
  componentDidMount() {
    this.getPokemon()
  }

  getPokemon() {
    fetchPokemon()
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
          <div className="left-triangle"></div>
          <div className="right-triangle"></div>
          <Filter filterPokemon={this.filterPokemon}/>
        </header>
        <main className="app-main">
          <PokemonList filteredPokemon={this.getFilteredPokemon()} infoPokemon={infoPokemon}/>
          <div className="left-circle"></div>
          <div className="right-circle"></div>
        </main>
      </div>
    );
  }
}

export default App;
