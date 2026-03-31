import { useState } from "react";

function Signup({ setPage }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:9095/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: "CANDIDATE"
        })
      });

      if (response.ok) {
        alert("Signup successful");
        setPage("login");
      } else {
        alert("Signup failed");
      }

    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Signup</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br/><br/>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/><br/>

      <button onClick={handleSignup}>Register</button>

      <br/><br/>
      <button onClick={() => setPage("login")}>
        Back to Login
      </button>
    </div>
  );
}

export default Signup;