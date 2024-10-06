import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import './FavoritesScreen.css';

function FavoritesScreen() {
  const { favorites, removeFromFavorites, setFavorites } = useContext(FavoritesContext);

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className="favoritesScreen">
      <h1>Ma Liste</h1>

      {favorites.length > 0 && (
        <button onClick={clearFavorites} className="clearFavoritesButton">
          Retirer tous les films/séries
        </button>
      )}

      {favorites.length > 0 ? (
        <div className="favoritesScreen__movies">
          {favorites.map((media) => (
            <div key={media.id} className="favoritesScreen__movie">
              {/* Vérifie si c'est une série ou un film et ajuste l'URL */}
              <Link to={`/${media.media_type === 'tv' ? 'tv' : 'movie'}/${media.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${media.poster_path}`}
                  alt={media.title || media.name}
                />
              </Link>
              <div className="favoritesScreen__movieInfo">
                <h3>{media.title || media.name || media.original_name}</h3>
                <p>{media.release_date || media.first_air_date}</p>

                <button
                  onClick={() => removeFromFavorites(media.id)}
                  className="removeButton"
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Vous n'avez ajouté aucun film ou série à votre liste.</p>
      )}
    </div>
  );
}

export default FavoritesScreen;
