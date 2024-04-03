// Login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    // Hardcoded username and password verification
    if (username === "1234" && password === "1234") {
      navigate("/attendance"); // Redirect to attendance screen
    } else {
      alert("Invalid username or password"); // Show error message
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
