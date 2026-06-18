import MovieListItem from "./MovieListItem.jsx";

export default function MovieList({ list, showNumbers, setActiveMovieId }) {
  return (
    <>
      {list.map((element, index) => (
        <MovieListItem
          key={element.id}
          number={index + 1}
          showNumbers={showNumbers}
          movieData={element}
          setActiveMovieId={setActiveMovieId}
        />
      ))}
    </>
  );
}
