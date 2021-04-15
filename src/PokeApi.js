import React from "react";
import axios from "axios";
import "bootstrap";

class PokeApi extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "ditto" || "",
      pokeName: "",
      pokePic: "",
      pokeAbl: [],
      pokeStat: [],
      pokeMoves: []
    };

    this.handleOnChange = (val) => {
      this.setState({ search: val.target.value });
    };

    this.handleClick = (val) => {
      console.log(this.state.search);
    };
  }

  async componentDidUpdate() {
    try {
      let cancel;
      await axios
        .get("https://pokeapi.co/api/v2/pokemon/" + this.state.search, {
          cancelToken: new axios.CancelToken((c) => (cancel = c))
        })
        .then((result) =>
          this.setState({
            pokeName: result.data.name,
            pokePic: result.data.sprites.front_default,
            pokeAbl: result.data.abilities,
            pokeStat: result.data.stats,
            pokeMoves: result.data.moves
          })
        );

      return () => {
        cancel();
      };
    } catch {}
  }

  render() {
    let { pokeAbl, pokeName, pokePic, pokeStat, pokeMoves } = this.state;

    return (
      <div>
        <h5>API POKEDEX</h5>

        <div>
          Examples
          <br />
          steelix, bulbasaur, meowth
        </div>
        <div>
          <input
            placeholder="enter a pokemon"
            type="text"
            onChange={(val) => this.handleOnChange(val)}
          />
          <br />
          {pokeName}
        </div>

        <div>
          <img alt="poke sprite" src={pokePic} />
        </div>

        <div>
          <h3>Ablities</h3>
          {pokeAbl.map((e, index) => (
            <div key={index}>{e.ability.name}</div>
          ))}
        </div>

        <div>
          <h3>Stats</h3>
          {pokeStat.map((f, index) => (
            <div key={index}>
              {f.stat.name}:{f.base_stat}
            </div>
          ))}
        </div>

        <div>
          <h3>Moves</h3>
          {pokeMoves.map((h, index) => (
            <div key={index}>{h.move.name}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default PokeApi;
