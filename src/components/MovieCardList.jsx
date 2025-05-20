import MovieCard from "./MovieCard.jsx";

export default function MovieCardList({ list }) {
  return (
    <>
      <h1>Movie Card List</h1>
      {list.map((element) => (
        <MovieCard key={element.id} movieData={element} />
      ))}
    </>
  );
}
