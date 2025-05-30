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

  const directors = movieDetails.persons.filter((p) => p.job === "Director");
  const cast = movieDetails.persons.filter((p) => p.job === "Actor");
  const crew = movieDetails.persons.filter((p) => p.job !== "Actor");
  console.log(directors);
  console.log(cast);
  console.log(crew);

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
      <p>TMDB score: {movieDetails.rating}/10</p>
      <p>{movieDetails.genres[0] && movieDetails.genres[0]}</p>
      <p>{movieDetails.genres[1] && movieDetails.genres[1]}</p>
      <p>{movieDetails.genres[2] && movieDetails.genres[2]}</p>
      <p>{movieDetails.genres[3] && movieDetails.genres[3]}</p>
      <p>{movieDetails.genres[4] && movieDetails.genres[4]}</p>
      <p>{movieDetails.genres[5] && movieDetails.genres[5]}</p>
      <p>{movieDetails.overview}</p>

      <h2>Directed by</h2>
      {directors.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
      <h2>Cast</h2>
      {cast.map((person) => (
        <p key={person.character+person.id}>{person.name}: {person.character}</p>
      ))}
      <h2>Crew</h2>
      {crew.map((person) => (
        <p key={person.job+person.id}>{person.name}: {person.job}</p>
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
