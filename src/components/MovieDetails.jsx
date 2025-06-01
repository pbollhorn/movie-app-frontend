import { useState, useEffect } from "react";
import styles from "./MovieDetails.module.css";

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

  const directors = movieDetails.credits.filter((c) => c.job === "Director");
  const cast = movieDetails.credits.filter((c) => c.job === "Actor");
  const production = movieDetails.credits.filter(
    (c) => c.job !== "Actor" && c.job !== "Director"
  );

  return (
    <div className={styles.movieDetails}>
      {movieDetails.backdropPath &&
      <img
        src={"https://image.tmdb.org/t/p/w780/" + movieDetails.backdropPath}
      />}
      <h1>{movieDetails.title}</h1>
      <p>Original title: {movieDetails.originalTitle}</p>
      <p>Original language: {movieDetails.originalLanguage}</p>
      <p>
        Release date: {movieDetails.releaseDate[0]}-
        {movieDetails.releaseDate[1]}-{movieDetails.releaseDate[2]}
      </p>
      <p>TMDB score: {movieDetails.rating}/10</p>
      <p>{movieDetails.genres[0] && movieDetails.genres[0]}</p>
      <p>{movieDetails.genres[1] && movieDetails.genres[1]}</p>
      <p>{movieDetails.genres[2] && movieDetails.genres[2]}</p>
      <p>{movieDetails.genres[3] && movieDetails.genres[3]}</p>
      <p>{movieDetails.genres[4] && movieDetails.genres[4]}</p>
      <p>{movieDetails.genres[5] && movieDetails.genres[5]}</p>
      <p>{movieDetails.overview}</p>

      <h2>Directed by</h2>
      {directors.map((credit) => (
        <p key={credit.id}>{credit.name}</p>
      ))}
      <h2>Cast</h2>
      {cast.map((credit) => (
        <p key={credit.id}>
          {credit.name}: {credit.character}
        </p>
      ))}
      <h2>Production</h2>
      {production.map((credit) => (
        <p key={credit.id}>
          {credit.name}: {credit.job}
        </p>
      ))}
    </div>
  );
}

async function fetchMovieDetails(id) {
  const response = await fetch("https://movie.jcoder.dk/api/movies/" + id);
  const movieDetails = await response.json();
  console.log(movieDetails);
  return movieDetails;
}
