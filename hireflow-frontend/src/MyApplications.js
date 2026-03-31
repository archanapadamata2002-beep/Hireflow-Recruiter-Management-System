import { useEffect, useState } from "react";
import "./App.css";

function MyApplications() {

  const [applications, setApplications] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:9095/api/applications/candidate/${userId}`)
      .then(res => res.json())
      .then(data => setApplications(data));
  }, [userId]);

  return (
    <div className="page">

      <h2>My Applications</h2>

      {applications.map(app => (
        <div className="card" key={app.id}>

          <h3>{app.job.title}</h3>
          <p>{app.job.company}</p>

          <p className={
            app.status === "SELECTED" ? "green" :
            app.status === "REJECTED" ? "red" : "orange"
          }>
            {app.status}
          </p>

          <p><b>Score:</b> {app.matchScore}%</p>

        </div>
      ))}

    </div>
  );
}

export default MyApplications;