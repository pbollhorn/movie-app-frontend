export default function MovieCard({ movieData }) {
  return (
    <div>
      <h1>{movieData.title}</h1>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movieData.posterPath}
      ></img>
    </div>
  );
}
