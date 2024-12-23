// pages/pokemon/[id].js
import axios from "axios";
import Link from "next/link";

export default async function PokemonDetails({ params }) {
  const id = (await params).id;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await response.data;
  return (
    <>
      <div className="container mx-auto p-4 flex justify-center items-center">
        <div className="bg-white shadow-md rounded p-6 max-w-2xl w-full">
          {/* Breadcrumb */}
          <div className="nav flex justify-between">
            <Link href="/" className="text-[#1DCAA9] font-bold"> &lt;Back </Link>
            <nav className="mb-4 text-sm text-gray-600">
              <Link href="/" className="text-blue-500 hover:underline">
                Home
              </Link>{" "}
              → <span className="capitalize font-bold">{pokemon.name}</span>
            </nav>
          </div>

          {/* Pokémon Details */}

          <div className="container mx-auto p-4 flex justify-center items-center pt-16 ">
            <div className="max-w-md w-full">
              <div className="flex flex-col items-center text-center">
                {/* Image */}
                <div className="pokemon-image flex flex-col items-center text-center bg-[#60E2C9] w-full">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="min-h-96 object-contain mb-4"
                  />
                </div>
              </div>
              {/* Name */}
              <div className="bg-[#FDC666] p-4">
                <p>
                  <strong>Name: </strong> {pokemon.name}
                </p>
                <p>
                  <strong>Type: </strong>{" "}
                  {pokemon.types.map((type) => type.type.name).join(", ")}
                </p>
                <p>
                  <strong>Stats: </strong>{" "}
                  {pokemon.stats.map((stat) => `${stat.stat.name}`).join(", ")}
                </p>
                <p>
                  <strong>Abilities: </strong>{" "}
                  {pokemon.abilities
                    .map((ability) => `${ability.ability.name}`)
                    .join(", ")}
                </p>
                <p>
                  <strong>Some Moves: </strong>{" "}
                  {pokemon.moves
                    .slice(0, 10)
                    .map((move) => `${move.move.name}`)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
