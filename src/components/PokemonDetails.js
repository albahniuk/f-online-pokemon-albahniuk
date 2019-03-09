import React, {Component, Fragment} from "react";

class PokemonDetails extends Component {
  render() {
    const {id, name, abilities, image} = this.props;
    return (
        <Fragment>
            <div className="image-container">
                <img className="pokemon-image" src={image} alt={name}/>
                <p className="pokemon-id">id / {id}</p>
            </div>
            <p className="pokemon-name">{name}</p>
            <ul className="abilities-list">
                {abilities.map((item, index) => {
                    return(
                        <li className="abilities-list__item" key={index}>{item.ability.name}</li>
                    )
                })}
            </ul>
        </Fragment>
    );
  }
}

export default PokemonDetails;