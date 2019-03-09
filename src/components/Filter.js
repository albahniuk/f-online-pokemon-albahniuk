import React, {Component} from "react";

class Filter extends Component {
  render() {
    return (
      <div className="filter-container">
        <label></label>
        <input type="text" onKeyUp={this.props.filterPokemon} placeholder="Busca un Pokemon..." className="filter-pokemon" />
      </div>
    );
  }
}

export default Filter;