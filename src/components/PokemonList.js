import React, { Component } from "react";

class PokemonList extends Component {
    render() {
        const { filteredPokemon } = this.props;
        if (filteredPokemon.length === 0) {
            return (
                <p>No hay resultados</p>
            )
        } else {
            return (
                <ul className="pokemon-list">
                    {filteredPokemon.map(item => {
                        return(
                            <li className="pokemon-list__item" key={item.id}>
                                <img className="pokemon-image" src={item.sprites.front_default} alt={item.name}/>
                                <p className="pokemon-id">`id / {item.id}`</p>
                                <p className="pokemon-name">{item.name}</p>
                                <ul className="abilities-list">
                                    {item.abilities.map((item, index) => {
                                        return(
                                            <li className="abilities-list__item" key={index}>{item.ability.name}</li>
                                        )
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            );
        }
    }
}

export default PokemonList;