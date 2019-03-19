import React, { Component } from 'react';
import './App.scss';
import PokemonList from './components/PokemonList';
import { getPokemon } from './services/PokemonService';
import Filter from './components/Filter';

class App extends Component {
  state = {
    filteredPokemon: '',
    infoPokemon: []
  }

  componentDidMount() {
    getPokemon()
    .then(infoPokemon => this.setState({
      infoPokemon
    }))
  }

  filterPokemon = (e) => {
    const filteredPokemon = e.currentTarget.value;
    this.setState({filteredPokemon})
  }

  getFilteredPokemon = () => {
    const { infoPokemon, filteredPokemon } = this.state;
    return infoPokemon.filter(item => item.name.toUpperCase().includes(filteredPokemon.toUpperCase()));
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="left-triangle"></div>
          <div className="right-triangle"></div>
          <Filter filterPokemon={this.filterPokemon} />
        </header>
        <main className="app-main">
          <PokemonList filteredPokemon={this.getFilteredPokemon()} />
          <div className="left-circle"></div>
          <div className="right-circle"></div>
        </main>
      </div>
    );
  }
}

export default App;
