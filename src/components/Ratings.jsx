import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCardList from "./MovieCardList.jsx";
import api from "../apiFacade.js";
import NoRating from "../assets/NoRating.svg";
import GoodRating from "../assets/GoodRating.svg";
import OkRating from "../assets/OkRating.svg";

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
    <>
      <h1>Your Ratings</h1>
      <div>
        <p>How to rate movies:</p>
        <p>
          <img src={GoodRating} style={{ height: "1.5rem" }} />= Good
        </p>
        <p>
          <img src={OkRating} style={{ height: "1.5rem" }} />= OK / bad
        </p>
        <p>
          <img src={NoRating} style={{ height: "1.5rem" }} />= Not rated
        </p>
      </div>
      <MovieCardList list={list} setActiveMovieId={setActiveMovieId}/>
    </>
  );
}
