import { useState, useRef } from "react";
import api from "../apiFacade.js";
import MovieCardList from "./MovieCardList.jsx";

export default function Search() {
  const [list, setList] = useState([]);
  const searchTextRef = useRef(null);

  async function handleSearchSubmit(event) {
    event.preventDefault();
    const text = searchTextRef.current.value;
    const data = await fetchSearch(text);
    console.log(data);
    setList(data);
  }

  return (
    <>
      <h1>Open Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <label>Search in title or original title: </label>
        <input type="text" ref={searchTextRef} />
        <button type="submit">Search</button>
      </form>
      <MovieCardList list={list} />
    </>
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
      "https://movie.jcoder.dk/api/movies/search-open?text=" + text
    );
    const data = await response.json();
    return data;
  }
}
