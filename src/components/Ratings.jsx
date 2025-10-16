import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCardList from "./MovieCardList.jsx";
import api from "../apiFacade.js";
import styles from "./Ratings.module.css";
import NoRating from "../assets/NoRating.svg";
import GoodRating from "../assets/GoodRating.svg";
import OkRating from "../assets/OkRating.svg";

export default function Ratings() {
  const [list, setList] = useState([]);

  const { setActiveMovieId } = useOutletContext();

  // useEffect
  useEffect(() => {
    if (!api.loggedIn()) return;

    api.fetchData("movies", api.makeOptions("GET", true)).then((data) => {
      console.log(data);
      setList(data);
    });
  }, []); // Runs on mount

  return (
    <>
      <h1>Your Ratings</h1>
      <div className={styles.ratingsExplanation}>
        <p>
          <img src={GoodRating} /> Good
        </p>
        <p>
          <img src={OkRating} /> OK / Bad
        </p>
        <p>
          <img src={NoRating} /> Not rated
        </p>
      </div>

      {api.loggedIn() ? (
        <MovieCardList list={list} setActiveMovieId={setActiveMovieId} />
      ) : (
        <p>{api.getLoginEncouragement()}</p>
      )}
    </>
  );
}
