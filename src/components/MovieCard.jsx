import { useState, useEffect } from "react";
import styles from "./MovieCard.module.css";
import NoOpinion from "../assets/NoOpinion.png";
import ThumbsUp from "../assets/ThumbsUp.png";
import ThumbsDown from "../assets/ThumbsDown.png";

export default function MovieCard({ movieData }) {
  const [opinion, setOpinion] = useState(movieData.likes);

  // const opinionPictures = [NoOpinion, ThumbsUp, ThumbsDown];

  // let opinionPic = NoOpinion;
  // useEffect(() => {
  //   switch (opinion) {
  //     case null:
  //       opinionPic = NoOpinion;
  //       break;
  //     case true:
  //       opinionPic = ThumbsUp;
  //       break;
  //     case false:
  //       opinionPic = ThumbsDown;
  //       break;
  //   }
  // }, [opinion]); // Runs on mount and when opinion changes

  let opinionPic;
  switch (opinion) {
    case null:
      opinionPic = NoOpinion;
      break;
    case true:
      opinionPic = ThumbsUp;
      break;
    case false:
      opinionPic = ThumbsDown;
      break;
  }

  function clickOpinionPic() {
    switch (opinion) {
      case null:
        setOpinion(true);
        break;
      case true:
        setOpinion(false);
        break;
      case false:
        setOpinion(null);
        break;
    }
  }

  return (
    <div className={styles.movieCard}>
      <div>
        <img src={"https://image.tmdb.org/t/p/w500/" + movieData.posterPath} />
      </div>
      <div>
        <h1>{movieData.title}</h1>
        <h1>{movieData.originalTitle}</h1>
        <h1>
          {"" +
            movieData.releaseDate[0] +
            " Rating: " +
            movieData.rating +
            "/10"}
        </h1>
      </div>
      <div>
        <img src={opinionPic} onClick={clickOpinionPic} />
      </div>
    </div>
  );
}
