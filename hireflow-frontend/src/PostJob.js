import { useState } from "react";
import "./App.css";

function PostJob({ setPage }) {

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    experience: "",
    salary: ""
  });

  const handlePost = async () => {

  if (!job.title || !job.company || !job.location || !job.description) {
    alert("Please fill all required fields");
    return;
  }

  const response = await fetch("http://localhost:9095/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...job,
      experience: job.experience ? Number(job.experience) : null
    })
  });

  if (response.ok) {
    alert("Job Posted Successfully");
    setPage("dashboard");
  } else {
    alert("Error posting job");
  }
};

  return (
    <div className="container">

      <h2>Post Job</h2>

      <input className="input" placeholder="Title"
        onChange={e => setJob({...job, title: e.target.value})} />

      <input className="input" placeholder="Company"
        onChange={e => setJob({...job, company: e.target.value})} />

      <input className="input" placeholder="Location"
        onChange={e => setJob({...job, location: e.target.value})} />

      <input className="input" placeholder="Experience"
        onChange={e => setJob({...job, experience: e.target.value})} />

      <input className="input" placeholder="Salary"
        onChange={e => setJob({...job, salary: e.target.value})} />

      <textarea
        className="input"
        placeholder="Job Description"
        rows="5"
        style={{ width: "100%" }}
        onChange={e => setJob({...job, description: e.target.value})}
      />

      <br/>

      <button className="button btn-primary" onClick={handlePost}>
        Post Job
      </button>

      <button className="button" onClick={() => setPage("dashboard")}>
        Back
      </button>

    </div>
  );
}

export default PostJob;