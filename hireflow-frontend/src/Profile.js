import { useEffect, useState } from "react";
import "./App.css";

function Profile() {

  const [user, setUser] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:9095/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const updateProfile = async () => {
    await fetch(`http://localhost:9095/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    alert("Profile Updated");
  };

  return (
    <div className="page">

      <h2>My Profile</h2>

      <div className="card">

        <input
          className="input"
          value={user.name || ""}
          onChange={e => setUser({ ...user, name: e.target.value })}
        />

        <input
          className="input"
          value={user.email || ""}
          onChange={e => setUser({ ...user, email: e.target.value })}
        />

        <button className="btn btn-green" onClick={updateProfile}>
          Update
        </button>

      </div>

    </div>
  );
}

export default Profile;