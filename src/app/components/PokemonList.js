// components/PokemonList.js
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemons, setLoading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          url={pokemon.url}
          image={pokemon.image}
          setLoading={setLoading}
        />
      ))}
    </div>
  );
}

export default PokemonList;
