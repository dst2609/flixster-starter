import React from "react";
import "./MovieCard.css";

const MovieCard = ({ title, posterPath, voteAverage }) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>Rating: {voteAverage}</p>
      </div>
    </div>
  );
};

export default MovieCard;
