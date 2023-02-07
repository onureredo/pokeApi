import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import not_available from "../assets/images/not_found.png";

function Axios() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonId, setPokemonId] = useState(Math.floor(Math.random() * 100));
  const [previousPokemonId, setPreviousPokemonId] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => {
        setPokemon(response.data);
      });
  }, [pokemonId]);

  const randomPokemon = () => {
    setPreviousPokemonId(pokemonId);
    setPokemonId(Math.floor(Math.random() * 1000));
  };

  const previousPokemon = () => {
    setPokemonId(previousPokemonId);
  };

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>Attack: {pokemon.stats?.[1].base_stat}</p>
      {pokemon.sprites?.other?.dream_world.front_default ? (
        <img
          src={pokemon.sprites?.other?.dream_world.front_default}
          alt={pokemon.name}
        />
      ) : (
        <img src={not_available} alt="show" />
      )}
      <br />
      {previousPokemonId !== null ? (
        <button onClick={previousPokemon}>PREVIOUS POKEMON</button>
      ) : null}
      <button onClick={randomPokemon}>RANDOM POKEMON</button>
      <br />
      <Link to="/">go back to Home</Link>
    </div>
  );
}

export default Axios;
