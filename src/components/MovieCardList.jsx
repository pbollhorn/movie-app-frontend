import MovieCard from "./MovieCard.jsx";

export default function MovieCardList({ list }) {
  return (
    <>
      {list.map((element) => (
        <MovieCard key={element.id} movieData={element} />
      ))}
    </>
  );
}
