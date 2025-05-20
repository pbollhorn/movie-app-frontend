import { useRef } from "react";
import api from "../apiFacade.js";

export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  function handleLoginSubmit(event) {
    event.preventDefault();
    api
      .login(usernameRef.current.value, passwordRef.current.value)
      .then(() => {
        localStorage.setItem("currentUsername", usernameRef.current.value);
        // setLoggedIn(true);
      })
      .catch(() => {
        alert("Wrong username or password");
        usernameRef.current.value = "";
        passwordRef.current.value = "";
      });
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>Username: </label>
        <input type="text" ref={usernameRef} />
        <label> Password: </label>
        <input type="password" ref={passwordRef} />{" "}
        <button type="submit">Login</button>
      </form>
    </>
  );
}
