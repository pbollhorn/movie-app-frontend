import { useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import api from "../../apiFacade.js";

export default function Login() {
  const { setLoggedIn } = useOutletContext();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleLoginSubmit(event) {
    event.preventDefault();
    api
      .login(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        setLoggedIn(true);
        navigate("/"); // this is the front page (i.e. the search page)
      })
      .catch(() => {
        alert("Wrong email or password");
        emailRef.current.value = "";
        passwordRef.current.value = "";
      });
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email:</label>
        <br />
        <input id="email" type="email" ref={emailRef} />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input id="password" type="password" ref={passwordRef} />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
