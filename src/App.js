import React, { Component } from 'react';
import './App.css';

const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/?limit=3&offset=3';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokemon: [],
      namePokemon: [],
      filteredPokemon: ''
    }

    this.getFilteredPokemon = this.getFilteredPokemon.bind(this);
    this.filterPokemon = this.filterPokemon.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
  }

  getPokemon(){
    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
        const newPokemon = data.results.map((item, index) => {
          return {...item, id: index};
        })
        this.setState({
          pokemon: data.results.url,
          namePokemon: newPokemon
        })
      })
      console.log(this.state.namePokemon);
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
    const {namePokemon, filteredPokemon} = this.state;

    return namePokemon.filter(item => item.name.toUpperCase().includes(filteredPokemon.toUpperCase()));
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <label>Busca un Pokemon:</label>
          <input type="text" onKeyUp={this.filterPokemon}/>
        </header>
        <main className="app-main">
          <div>
            <ul>
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
