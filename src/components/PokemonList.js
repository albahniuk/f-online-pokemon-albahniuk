import React, { Component } from "react";
import PokemonDetails from './PokemonDetails';

class PokemonList extends Component {
    render() {
        const { filteredPokemon } = this.props;
        if (filteredPokemon.length === 0) {
            return (
                <p className="message">No hay resultados</p>
            )
        } else {
            return (
                <ul className="pokemon-list">
                    {filteredPokemon.map(item => {
                        return (
                            <li className="pokemon-list__item" key={item.id}>
                                <PokemonDetails name={item.name} id={item.id} types={item.types} image={item.sprites.front_default} />
                            </li>
                        );
                    })}
                </ul>
            );
        }
    }
}

export default PokemonList;