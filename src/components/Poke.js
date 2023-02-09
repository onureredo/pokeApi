import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import PokemonType from "./PokemonType";
import Col from "react-bootstrap/Col";
import axios from "axios";

function PokemonList({ pokemonsInfo, cart, setCart, query, user }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
      .then((response) => {
        let pokemonWithStats = [];
        response.data.results.forEach((pokemon) => {
          axios
            .get(pokemon.url)
            .then((res) => {
              pokemonWithStats.push({
                name: pokemon.name,
                stats: res.data.stats,
              });
              if (pokemonWithStats.length === response.data.results.length) {
                setPokemon(pokemonWithStats);
                setLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Col sm={8} className="cardmain">
        {pokemon
          .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((pokemon) => {
            return (
              <>
                <Card
                  className="cardpoke"
                  border="primary"
                  style={{
                    padding: ".5rem",
                  }}
                >
                  <Card.Title className="title">{pokemon.name}</Card.Title>
                  <Card.Img
                    variant="top"
                    src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                    className="cardImage"
                  />
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <p>HP: {pokemon.stats?.[0].base_stat}</p>
                      <p>Speed: {pokemon.stats?.[5].base_stat}</p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>Attack: {pokemon.stats?.[1].base_stat}</p>
                        <p>S-Attack: {pokemon.stats?.[2].base_stat}</p>
                      </div>
                      <div>
                        <p>Defense: {pokemon.stats?.[3].base_stat}</p>
                        <p>S-Defense: {pokemon.stats?.[4].base_stat}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const stateCopy = cart.slice();
                        stateCopy.push({
                          image: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`,
                          name: pokemon.name,
                        });
                        setCart(stateCopy);

                        axios
                          .post("http://localhost:3001/pokemonCart/", {
                            img: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`,
                            pokeName: pokemon.name,
                            user: user.username,
                          })
                          .then(function (response) {
                            console.log(response);
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      }}
                      className="title button"
                    >
                      {" "}
                      Add
                    </button>
                  </Card.Body>
                </Card>
              </>
            );
          })}
      </Col>
    </>
  );
}

export default PokemonList;
