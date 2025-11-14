import MovieCard from "./MovieCard.jsx";

export default function MovieList({ list, setActiveMovieId }) {
  return (
    <>
      {list.map((element) => (
        <MovieCard
          key={element.id}
          movieData={element}
          setActiveMovieId={setActiveMovieId}
        />
      ))}
    </>
  );
}
