import { useState, useEffect } from "react";
import NoBackdrop from "../assets/NoBackdrop.png";

export default function MovieDetails({ activeMovieId }) {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fun = async () => {
      setMovieDetails(await fetchMovieDetails(activeMovieId));
    };
    if (activeMovieId) {
      fun();
    }
  }, [activeMovieId]);

  // Return early if no movieDetails to show
  if (movieDetails === null) {
    return <div></div>;
  }

  return (
    <div>
      <img
        src={
          movieDetails.backdropPath
            ? "https://image.tmdb.org/t/p/w780/" + movieDetails.backdropPath
            : NoBackdrop
        }
      />
      <h1>{movieDetails.title}</h1>
      <p>Original title: {movieDetails.originalTitle}</p>
      <p>Original language: {movieDetails.originalLanguage}</p>
      <p>
        Release date: {movieDetails.releaseDate[0]}-
        {movieDetails.releaseDate[1]}-{movieDetails.releaseDate[2]}
      </p>
      <p>Rating: {movieDetails.rating}/10</p>
      <p>{movieDetails.overview}</p>
    </div>
  );
}

async function fetchMovieDetails(id) {
  const response = await fetch("https://movie.jcoder.dk/api/movies/" + id);
  const movieDetails = await response.json();
  console.log(movieDetails);
  return movieDetails;
}
