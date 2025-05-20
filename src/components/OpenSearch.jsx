import { useState, useRef } from "react";
import api from "../apiFacade.js";
import MovieCardList from "./MovieCardList.jsx";

export default function OpenSearch() {
  const [list, setList] = useState([]);
  const searchTextRef = useRef(null);

  async function handleOpenSearchSubmit(event) {
    event.preventDefault();
    const text = searchTextRef.current.value;
    const data = await fetchOpenSearch(text);
    console.log(data);
    setList(data);
  }

  return (
    <>
      <h1>Open Search</h1>
      <form onSubmit={handleOpenSearchSubmit}>
        <label>Search in title or original title: </label>
        <input type="text" ref={searchTextRef} />
        <button type="submit">Search</button>
      </form>
      <MovieCardList list={list} />
    </>
  );
}

async function fetchOpenSearch(text) {
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
