import { useState } from "react";

export default function CreateAccount() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    alert(JSON.stringify(account));
  }

  function handleChange(event) {
    const key = event.target.id;
    const value = event.target.value;
    setAccount({ ...account, [key]: value });
  }

  return (
    <>
      {JSON.stringify(account)}
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Choose username:</label>
        <br />
        <input
          id="username"
          type="text"
          value={account.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="password">Choose password:</label>
        <br />
        <input
          id="password"
          type="password"
          value={account.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="repeatPassword">Repeat password:</label>
        <br />
        <input
          id="repeatPassword"
          type="password"
          value={account.repeatPassword}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
