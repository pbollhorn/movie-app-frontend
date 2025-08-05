import MovieCard from "./MovieCard.jsx";

export default function MovieCardList({
  list,
  setActiveMovieId,
  setModalIsOpen,
}) {
  return (
    <>
      {list.map((element) => (
        <MovieCard
          key={element.id}
          movieData={element}
          setActiveMovieId={setActiveMovieId}
          setModalIsOpen={setModalIsOpen}
        />
      ))}
    </>
  );
}
