// components/PokemonCard.js
import Link from "next/link";

function PokemonCard({ name, image, url, setLoading }) {
  const pokemonId = url.split("/").filter(Boolean).pop();
  return (
    <Link href={`/pokemon/${pokemonId}`} onClick={()=>setLoading(true)}>
      <div className="border rounded shadow-md p-4 hover:shadow-lg transition flex flex-col items-center">
        <img src={image} alt={name} className="w-24 h-24 object-contain mb-2" />
        <h2 className="capitalize font-bold">{name}</h2>
      </div>
    </Link>
  );
}

export default PokemonCard;
