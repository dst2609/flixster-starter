import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import Modal from "../Modal/Modal";
import "./MovieList.css";

const MovieList = ({ query, filter }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [page, query, filter]);

  const fetchMovies = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${filter}&page=${page}`;

    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        query
      )}&page=${page}`;
    }

    try {
      const response = await axios.get(url);
      const data = response.data;
      setMovies((prev) =>
        page > 1 ? [...prev, ...data.results] : data.results
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCardClick = async (movieId) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

    try {
      const [detailsResponse, videosResponse] = await Promise.all([
        axios.get(detailsUrl),
        axios.get(videosUrl),
      ]);

      const details = detailsResponse.data;
      const videos = videosResponse.data;
      const trailer = videos.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      const trailerUrl = trailer
        ? `https://www.youtube.com/embed/${trailer.key}`
        : null;

      setSelectedMovie({ ...details, trailerUrl });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching movie details or trailers:", error);
    }
  };

  return (
    <div>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => handleCardClick(movie.id)}>
            <MovieCard
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          </div>
        ))}
      </div>
      <button onClick={loadMore}>Load More</button>

      {isModalOpen && selectedMovie && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="movie-details">
            <h2>{selectedMovie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
            />
            <p>
              <strong>Release Date:</strong> {selectedMovie.release_date}
            </p>
            <p>
              <strong>Overview:</strong> {selectedMovie.overview}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {selectedMovie.genres.map((genre) => genre.name).join(", ")}
            </p>
            {selectedMovie.trailerUrl && (
              <div className="trailer-container">
                <iframe
                  src={selectedMovie.trailerUrl}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Movie Trailer"
                ></iframe>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MovieList;
