import { useState, useEffect } from "react";

export default function CreateAccount() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    const key = event.target.id;
    const value = event.target.value;
    setAccount({ ...account, [key]: value });
  }

  return (
    <div>
      {JSON.stringify(account)}
      <h1>Create account</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Choose username:</label>
        <br/>
        <input
          name="username"
          id="username"
          type="text"
          value={account.username}
          onChange={handleChange}
        />
        <br/>
        <br/>
        <label htmlFor="password">Choose password:</label>
        <br/>
        <input
          name="password"
          id="password"
          type="password"
          value={account.password}
          onChange={handleChange}
        />
        <br/>
        <br/>
        <label htmlFor="repeatPassword">Repeat password:</label>
        <br/>
        <input
          name="repeatPassword"
          id="repeatPassword"
          type="password"
          value={account.repeatPassword}
          onChange={handleChange}
        />
        <br/>
        <br/>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
