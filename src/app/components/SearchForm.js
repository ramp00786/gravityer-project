// components/SearchForm.js
import { useState } from "react";

function SearchForm({ types, onFilter }) {
  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value || null);
    onFilter(value || null, searchTerm);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilter(selectedType, value);
  };

  return (
    <form className="flex flex-col sm:flex-row gap-4 mb-6">
      <select className="border rounded p-2 flex-grow" onChange={handleTypeChange}>
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="border rounded p-2 flex-grow"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </form>
  );
}

export default SearchForm;
