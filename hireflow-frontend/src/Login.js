import { useState } from "react";
import "./App.css";

function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const res = await fetch("http://localhost:9095/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    localStorage.setItem("userId", data.id);
    localStorage.setItem("role", data.role);

    setPage("dashboard");
  };

  return (
    <div className="login-page">

      {/* 🔥 HIREFLOW TITLE */}
      <h1 className="brand">HireFlow</h1>

      {/* 🔥 LOGIN CARD */}
      <div className="login-card">

        <h2>Login</h2>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-buttons">
          <button className="btn btn-blue" onClick={handleLogin}>
            Login
          </button>

          <button className="btn btn-gray" onClick={() => setPage("signup")}>
            Signup
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;