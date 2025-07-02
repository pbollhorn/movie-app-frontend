import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCardList from "./MovieCardList.jsx";
import api from "../apiFacade.js";
import NoOpinion from "../assets/NoOpinion.svg";
import ThumbsUp from "../assets/ThumbsUp.svg";
import ThumbsDown from "../assets/ThumbsDown.svg";

export default function Ratings() {
  const [list, setList] = useState([]);

  const { setActiveMovieId } = useOutletContext();

  // useEffect
  useEffect(() => {
    api.fetchData("movies", api.makeOptions("GET", true)).then((data) => {
      console.log(data);
      setList(data);
    });
  }, []); // Runs on mount

  return (
    <div>
      <h1>Your Ratings</h1>
      <div>
        <p>
          <img src={ThumbsUp} style={{ height: "1.5rem" }} />: Like
        </p>
        <p>
          <img src={ThumbsDown} style={{ height: "1.5rem" }} />: OK / dislike
        </p>
        <p>
          <img src={NoOpinion} style={{ height: "1.5rem" }} />: Not rated
        </p>
      </div>
      <MovieCardList list={list} setActiveMovieId={setActiveMovieId} />
    </div>
  );
}
