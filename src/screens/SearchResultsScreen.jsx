import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from '../axios';
import './SearchResultsScreen.css';
import { FavoritesContext } from '../context/FavoritesContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const query = useQuery().get('query');
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const isFavorite = (movie) => favorites.some(fav => fav.id === movie.id);

  const toggleFavorite = (movie) => {
    if (isFavorite(movie)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        if (query) {
          // Requête pour les films
          const movieRequest = await axios.get(
            `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${currentPage}`
          );

          // Requête pour les séries
          const tvRequest = await axios.get(
            `/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${currentPage}`
          );

          // Fusionner les résultats des deux requêtes
          const combinedResults = [...movieRequest.data.results, ...tvRequest.data.results];
          setMovies(combinedResults);
          setTotalPages(Math.max(movieRequest.data.total_pages, tvRequest.data.total_pages)); // Recalcule les pages totales

          if (combinedResults.length === 0) {
            setError("No results found.");
          }
        }
      } catch (err) {
        setError("Failed to fetch results. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="searchResultsScreen">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="searchResultsScreen__movies">
            {movies.map((movie) => (
              <div key={movie.id} className="searchResultsScreen__movie">
                <Link to={`/${movie.media_type === 'tv' ? 'tv' : 'movie'}/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.name || movie.title}
                  />
                </Link>
                <div className="searchResultsScreen__movieInfo">
                  <h3>{movie.title || movie.name || movie.original_name}</h3>
                  <p>{movie.release_date || movie.first_air_date}</p>
                  <p>{movie.overview ? movie.overview.slice(0, 100) + "..." : "No description available."}</p>
                  <button
                    className={`favoriteButton ${isFavorite(movie) ? 'favorite' : ''}`}
                    onClick={() => toggleFavorite(movie)}
                  >
                    {isFavorite(movie) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResultsScreen;
