import MovieListItem from "./MovieListItem.jsx";

export default function MovieList({ list, showNumbers, setActiveMovieId }) {
  if (!list) {
    return <></>;
  }

  if (list.length === 0) {
    return <>No movies found</>;
  }

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
