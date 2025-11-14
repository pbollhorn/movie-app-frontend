import MovieListItem from "./MovieListItem.jsx";

export default function MovieList({ list, setActiveMovieId }) {
  return (
    <>
      {list.map((element) => (
        <MovieListItem
          key={element.id}
          movieData={element}
          setActiveMovieId={setActiveMovieId}
        />
      ))}
    </>
  );
}
