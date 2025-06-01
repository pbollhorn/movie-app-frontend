import { useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import api from "../apiFacade.js";

export default function Login() {
  
  const { setLoggedIn } = useOutletContext();
  const navigate = useNavigate();
  
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);


  function handleLoginSubmit(event) {
    event.preventDefault();
    api
      .login(usernameRef.current.value, passwordRef.current.value)
      .then(() => {
        setLoggedIn(true);
        navigate("/"); // this is the front page (i.e. the search page)
      })
      .catch(() => {
        alert("Wrong username or password");
        usernameRef.current.value = "";
        passwordRef.current.value = "";
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>Username: </label>
        <input type="text" ref={usernameRef} />
        <br/>
        <label> Password: </label>
        <input type="password" ref={passwordRef} />
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
