import MovieListItem from "./MovieListItem.jsx";
import styles from "./MovieList.module.css";

export default function MovieList({ list, showNumbers, setActiveMovieId }) {
  if (!list) {
    return <></>;
  }

  if (list.length === 0) {
    return <div className={styles.emptyList}>No movies found</div>;
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
