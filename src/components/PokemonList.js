import React, {Component} from "react";

class PokemonList extends Component {
  render() {
    return (
        <ul>
            {this.props.filteredPokemon.map(item => {
                return (
                    <li>{item.name}</li>
                );
            })}
        </ul>
    );
  }
}

export default PokemonList;