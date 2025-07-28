import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../apiFacade.js";
import MovieCardList from "./MovieCardList.jsx";

export default function Search() {
  const [list, setList] = useState([]);
  const searchTextRef = useRef(null);

  const { setActiveMovieId } = useOutletContext();

  async function handleSearchSubmit(event) {
    event.preventDefault();
    const text = searchTextRef.current.value;
    const data = await fetchSearch(text);
    console.log(data);
    setList(data);
  }

  return (
    <div>
      <h1>Search movies</h1>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" ref={searchTextRef} placeholder="Title or original title"/>
        <button type="submit">Search</button>
      </form>
      <MovieCardList list={list} setActiveMovieId={setActiveMovieId} />
    </div>
  );
}

async function fetchSearch(text) {
  if (api.loggedIn()) {
    const response = await fetch(
      "https://movie.jcoder.dk/api/movies/search?text=" + text,
      api.makeOptions("GET", true)
    );
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(
      "https://movie.jcoder.dk/api/movies/search?text=" + text
    );
    const data = await response.json();
    return data;
  }
}
