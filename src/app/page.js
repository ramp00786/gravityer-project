"use client";

import { useState, useEffect } from "react";
import { fetchPokemonTypes, fetchPokemons, getTotalPokemonCount } from "./utils/api";
import SearchForm from "./components/SearchForm";
import PokemonList from "./components/PokemonList";


export default function Home() {
  const [types, setTypes] = useState([]);
  const [visiblePokemons, setVisiblePokemons] = useState([]); // Pokémon for the current page
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Total Pokémon count
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const typesData = await fetchPokemonTypes();
      setTypes(typesData);

      const data = await fetchPokemons(null, null, 0, ITEMS_PER_PAGE); // First page of unfiltered results
      setVisiblePokemons(data.results);
      setTotalCount(data.count); // Total Pokémon count
      setLoading(false);
    };

    loadInitialData();
  }, []);

  const handleFilter = async (type, query) => {
    setLoading(true);
    setCurrentPage(1); // Reset to the first page
    setSearchQuery(query);
    setSelectedType(type);

    // Fetch filtered results
    const data = await fetchPokemons(type, query, 0, ITEMS_PER_PAGE);
    setVisiblePokemons(data.results);
    setTotalCount(data.count);
    setLoading(false);
  };

  const handleNextPage = async () => {
    if (currentPage * ITEMS_PER_PAGE < totalCount) {
      const nextPage = currentPage + 1;
      const offset = (nextPage - 1) * ITEMS_PER_PAGE;
      setLoading(true);

      const data = await fetchPokemons(selectedType, searchQuery, offset, ITEMS_PER_PAGE);
      setVisiblePokemons(data.results);
      setCurrentPage(nextPage);
      setLoading(false);
    }
  };

  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      const offset = (previousPage - 1) * ITEMS_PER_PAGE;
      setLoading(true);

      const data = await fetchPokemons(selectedType, searchQuery, offset, ITEMS_PER_PAGE);
      setVisiblePokemons(data.results);
      setCurrentPage(previousPage);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Search</h1>
      <SearchForm types={types} onFilter={handleFilter} />
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {totalCount === 0 ? (
            <p className="text-center text-gray-500">No Pokémon found.</p>
          ) : (
            <PokemonList setLoading={setLoading} pokemons={visiblePokemons} />
          )}
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage * ITEMS_PER_PAGE >= totalCount}
              className={`px-4 py-2 border rounded ${
                currentPage * ITEMS_PER_PAGE >= totalCount
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
}
