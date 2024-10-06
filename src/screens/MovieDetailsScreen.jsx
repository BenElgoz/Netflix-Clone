import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import './MovieDetailsScreen.css';

const base_url = "https://image.tmdb.org/t/p/w200"; 

function MovieDetailsScreen() {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMediaDetails() {
      setLoading(true);
      setError(false);
      try {
        // Vérifier si c'est un film ou une série en utilisant l'API appropriée
        const mediaType = window.location.pathname.includes('/tv') ? 'tv' : 'movie';
        const request = await axios.get(`/${mediaType}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=credits,reviews`);
        setMedia(request.data); 
      } catch (err) {
        setError("Failed to fetch details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchMediaDetails();
  }, [id]);

  if (loading) return <div className="loader"></div>;

  if (error) return <p className="error-message">{error}</p>;

  return (
    media && (
      <div className="movieDetailsScreen">
        <div className="movieDetailsScreen__header">
          <img
            src={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
            alt={media.title || media.name}
          />
          <div className="movieDetailsScreen__headerContent">
            <h1>{media.title || media.name}</h1>
            <p>{media.overview}</p>
            <div className="movieDetailsScreen__info">
              <span><strong>Release Date:</strong> {media.release_date || media.first_air_date}</span>
              <span><strong>Genres:</strong> {media.genres.map((genre) => genre.name).join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="movieDetailsScreen__additionalInfo">
          <h2>Cast</h2>
          <ul className="castList">
            {media.credits.cast.slice(0, 10).map((actor) => (
              <li key={actor.cast_id} className="castItem">
                {actor.profile_path ? (
                  <img
                    src={`${base_url}${actor.profile_path}`}
                    alt={actor.name}
                    className="actorPhoto"
                  />
                ) : (
                  <div className="noPhoto">No Photo</div>
                )}
                <div className="actorInfo">
                  <strong>{actor.name}</strong> as <span>{actor.character}</span>
                </div>
              </li>
            ))}
          </ul>

          <h2>Reviews</h2>
          {media.reviews.results.length > 0 ? (
            media.reviews.results.map((review) => (
              <div key={review.id} className="movieDetailsScreen__review">
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    )
  );
}

export default MovieDetailsScreen;
