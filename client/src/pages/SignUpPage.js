import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext'

const SignUpPage = ({ errorData, setErrorData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePassConfChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        navigate("/events");
      } else {
        r.json().then((err) => setErrorData(err.errors));
      }
    });
  };

  return (
    <div className="event">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label htmlFor="confirmation">Confirm Password:</label>
          <input type="password" id="confirmation" value={passwordConfirmation} onChange={handlePassConfChange} />
        </div>
        <button type="submit">Sign Up</button>
        {errorData.length > 0 ? <ul style={{ color: "red" }}>
          <li>{errorData}</li>
        </ul> : null}
      </form>
    </div>
  );
};

export default SignUpPage;