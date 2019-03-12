import React from "react";

function PokemonDetails({ id, name, types, image }){
    return (
        <>
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
        </>
    );
}

export default PokemonDetails;