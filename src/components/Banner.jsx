import React, { useState, useEffect, useContext } from 'react';
import axios from '../axios';
import requests from '../requests';
import './Banner.css';
import { FavoritesContext } from '../context/FavoritesContext'; 

function Banner() {
  const [movie, setMovie] = useState([]);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext); 

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  // Vérifier si l'élément est une série 
  const isTVShow = movie?.media_type === 'tv';

  // Vérifier si l'élément est dans les favoris
  const isFavorite = (movie) => favorites.some(fav => fav.id === movie.id);

  // Fonction pour ajouter ou retirer l'élément des favoris
  const toggleFavorite = () => {
    if (isFavorite(movie)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {isTVShow ? movie?.name || movie?.original_name : movie?.title || movie?.original_title} {/* title for movies, name for series */}
        </h1>
        <div className="banner__buttons">
          <button
            className={`banner__button ${isFavorite(movie) ? 'favorite' : ''}`}
            onClick={toggleFavorite}
          >
            {isFavorite(movie) ? 'Remove from My List' : 'Add to My List'}
          </button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
