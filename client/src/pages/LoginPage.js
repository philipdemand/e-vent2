import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext'

const LoginPage = ({ errorData, setErrorData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    fetch("/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
            if (res.ok) {
              res.json().then((data) => setUser(data));
              setUsername("");
              setPassword("");
              navigate("/events");
            } else {
              res.json().then((data) => setErrorData(data.errors));
          }
    });
  }

  const errorsToDisplay = errorData.map((error) => {
    return (
      <ul style={{ color: "red" }}>
        <li key={error}>{error}</li>
      </ul>
    );
  });

  return (
    <div className="event">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        {errorsToDisplay}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;