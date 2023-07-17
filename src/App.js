import React, { useState, useEffect } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import PokemonImage from './components/PokemonImage';

function App() {
  const [allPokemon, setAllPokemon] = useState([]); //Holds the retrieved Pokémon data
  const [searchQuery, setSearchQuery] = useState(''); //Stores the user's input in the search box

  const getPokemon = async () => {
    if (searchQuery.trim() === '') {
      // prevents user from being able to submit an empty text box
      return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Pokemon not found!');
      }

      const pokemon = await response.json();

      // updates the state with the pokemon data that was retrieved 
      setAllPokemon((prevPokemon) => [...prevPokemon, pokemon]);

      // clear the search text field, 
      setSearchQuery('');
      
    } catch (error) {
      console.log('Error fetching Pokemon:', error.message);
    }
  };

  //removes pokemon from the list
  const removePokemon = (id) => {
    setAllPokemon((prevPokemon) =>
      prevPokemon.filter((pokemon) => pokemon.id !== id)
    );
  };

  //fetches pokemon data when the component is first rendered 
  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className='container d-flex align-items-center justify-content-center vh-100'>
      <div className='pokedex-container'>
        <div className='circle-container d-flex p-2'>
          <div className='blue-circles'></div>
          <div className='red circles'></div>
          <div className='yellow circles'></div>
          <div className='green circles'></div>
        </div>
        <div className='pokemon-container-background'>
        <div className='pokemon-container'>
          {allPokemon.map((pokemon) => (
            <PokemonImage
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              abilities={pokemon.abilities.map((ability) => ability.name)}
              key={pokemon.id}
              onRemove={removePokemon}
            />
          ))}
        </div>
        </div>
        <div className='search-container'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Enter Pokémon name'
          />
          <button className='search-button' onClick={getPokemon}>
            Search
          </button>
        </div>
        <div className='space-holder-buttons-container'>
        <div className='space-holder-buttons'></div>
        <div className='space-holder-buttons'></div>
        </div>
      </div>
    </div>
  );

}

export default App;
