import { useEffect } from "react";

export default function MovieDetails({ movieId }) {
  let movieDetails = null;
  useEffect(() => {
    const fun = async () => {
      movieDetails = await fetchMovieDetails(movieId);
    };
    fun();
  }, [movieId]);

  if (movieDetails === null) {
    return <div></div>;
  }

  return (
    <div>
      <h1>Movie Details</h1>
      <h1>{movieDetails.title}</h1>
    </div>
  );
}

async function fetchMovieDetails(movieId) {
  const response = await fetch("https://movie.jcoder.dk/api/movies/" + movieId);
  const movieDetails = await response.json();
  console.log(movieDetails);
  return movieDetails;
}
