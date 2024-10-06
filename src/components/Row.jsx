import React, { useState, useEffect, useContext } from 'react';
import axios from '../axios';
import './Row.css';
import Slider from 'react-slick';
import Modal from 'react-modal';
import { FavoritesContext } from '../context/FavoritesContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const base_url = "https://image.tmdb.org/t/p/original/";

// Flèche suivante
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "none", right: "-30px" }}
      onClick={onClick}
    />
  );
}

// Flèche précédente
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "none", left: "-30px" }}
      onClick={onClick}
    />
  );
}

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);

    const mediaType = movie.media_type === 'tv' ? 'tv' : 'movie';
    const request = await axios.get(`/${mediaType}/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=credits`);
    setMovieDetails(request.data);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMovieDetails(null);
  };

  const isFavorite = (movie) => favorites.some(fav => fav.id === movie.id);

  const toggleFavorite = (movie) => {
    if (isFavorite(movie)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 8,
    slidesToScroll: 8,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1440, // Breakpoint pour 1440px, pareil pour ceux dessous
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          speed: 800,
        }
      },
      {
        breakpoint: 1280, 
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          speed: 800,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          speed: 800,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          speed: 800,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          speed: 800,
        }
      }
    ]
  };  
  

  return (
    <div className="row">
      <h2>{title}</h2>
      <Slider {...settings} className="row__posters">
        {movies.map((movie) => (
          <div key={movie.id} className="row__posterContainer">
            <img
              className="row__poster"
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name || movie.title}
              onClick={() => handleMovieClick(movie)}
            />
          </div>
        ))}
      </Slider>

      {selectedMovie && movieDetails && (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Movie Details"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal__content">
            <img 
              className="modal__banner" 
              src={`${base_url}${selectedMovie.backdrop_path || selectedMovie.poster_path}`} 
              alt={selectedMovie.title || selectedMovie.name} 
            />
            <div className="modal__details">
              <h2>{selectedMovie?.title || selectedMovie?.name || selectedMovie?.original_name}</h2>
              <p>{selectedMovie?.overview}</p>
              <p><strong>Release Date:</strong> {selectedMovie.release_date || selectedMovie.first_air_date}</p>
              <p><strong>Duration:</strong> {movieDetails.runtime || movieDetails.episode_run_time?.[0]} minutes</p>
              <p><strong>Rating:</strong> {selectedMovie.vote_average}/10</p>
              {movieDetails.credits && movieDetails.credits.cast && (
                <p><strong>Cast:</strong> {movieDetails.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
              )}

              <button
                onClick={() => toggleFavorite(selectedMovie)}
                className="modal__addButton"
              >
                {isFavorite(selectedMovie) ? 'Retirer de ma liste' : 'Ajouter à ma liste'}
              </button>

              <button onClick={closeModal} className="modal__closeButton">Close</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Row;
