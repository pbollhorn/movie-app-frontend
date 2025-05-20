import { useRef } from "react";
import api from "../apiFacade.js";

export default function OpenSearch() {
  const searchTextRef = useRef(null);

  // console.log(
  //   api.fetchData("movies/search-open?text=olsen", api.makeOptions("GET", true))
  // );

  async function handleOpenSearchSubmit(event) {
    event.preventDefault();
    console.log(searchTextRef.current.value);
    const text = searchTextRef.current.value;

    const data = await fetchOpenSearch(text);

    console.log(data);
  }

  return (
    <>
      <h1>Open Search</h1>
      <form onSubmit={handleOpenSearchSubmit}>
        <label>Search in title or original title: </label>
        <input type="text" ref={searchTextRef} />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

async function fetchOpenSearch(text) {
  const response = await fetch(
    "https://movie.jcoder.dk/api/movies/search-open?text=" + text
  );
  const data = await response.json();
  return data;
}
