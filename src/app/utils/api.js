// utils/api.js
import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonTypes = async () => {
  const response = await axios.get(`${BASE_URL}/type`);
  return response.data.results;
};

export const fetchPokemons = async (type, query, offset = 0, limit = 20) => {
    let pokemons = [];
  
    if (type) {
      // Fetch Pokémon by type
      const typeResponse = await axios.get(`${BASE_URL}/type/${type}`);
      pokemons = typeResponse.data.pokemon.map((p) => p.pokemon);
    } 
    else if(!type && query){
        const response = await axios.get(
            `${BASE_URL}/pokemon?offset=${offset}&limit=1000`
        );
        pokemons = response.data.results;
    }
    else {
      // Fetch general Pokémon list (paginated)
      const response = await axios.get(
        `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
      );
      pokemons = response.data.results;
    }
  
    // Apply name-based filtering if a search query is provided
    if (query) {
      pokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    // Enrich Pokémon data (add types, images)
    const enhancedPokemons = await Promise.all(
      pokemons.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: details.data.name,
          url: pokemon.url,
          image: details.data.sprites.front_default,
          types: details.data.types.map((t) => t.type.name),
        };
      })
    );
    const response_total_count = await axios.get(`${BASE_URL}/pokemon?limit=1`);
    return {
      results: enhancedPokemons,
      count: query || type ? pokemons.length : response_total_count.data.count, // Use total count for unfiltered results
    };
  };

export const getTotalPokemonCount = async () => {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=1`);
  return response.data.count; // Total Pokémon count
};
