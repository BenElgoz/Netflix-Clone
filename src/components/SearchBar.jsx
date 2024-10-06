import React, { useState } from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?query=${query}`); // redirige vers la page de résultats avec la requête
    }
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie or a TV show..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
