import React from "react";

function Filter({ filterPokemon }) {
  return (
    <div className="filter-container">
      <label></label>
      <input type="text" onKeyUp={filterPokemon} placeholder="Search Pokémon..." className="filter-pokemon" />
    </div>
  );
}

export default Filter;