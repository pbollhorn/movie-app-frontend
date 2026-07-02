import MovieListItem from "./MovieListItem.jsx";

export default function MovieList({ list, showNumbers, setActiveMovieId }) {
  return (
    <>
      {list.map((movie, index) => (
        <MovieListItem
          key={movie.id}
          number={index + 1}
          showNumbers={showNumbers}
          movieData={movie}
          setActiveMovieId={setActiveMovieId}
        />
      ))}
    </>
  );
}
