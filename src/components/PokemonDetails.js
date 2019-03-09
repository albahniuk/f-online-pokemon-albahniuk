import React, { Component, Fragment } from "react";

class PokemonDetails extends Component {
    render() {
        const { id, name, types, image } = this.props;
        return (
            <Fragment>
                <div className="image-container">
                    <img className="pokemon-image" src={image} alt={name} />
                    <p className="pokemon-id">id / {id}</p>
                </div>
                <p className="pokemon-name">{name}</p>
                <ul className="types-list">
                    {types.map((item, index) => {
                        return (
                            <li className="types-list__item" key={index}>{item.type.name}</li>
                        )
                    })}
                </ul>
            </Fragment>
        );
    }
}

export default PokemonDetails;