import { useEffect, useState } from "react";
import "./App.css";

function Dashboard() {

  const [jobs, setJobs] = useState([]);

  // 🔍 FILTER STATES
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState("");

  const candidateId = localStorage.getItem("userId");

  // 🔥 LOAD ALL JOBS INITIALLY
  useEffect(() => {
    fetch("http://localhost:9095/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  // 🔍 SEARCH JOBS (BACKEND FILTER)
  const searchJobs = async () => {
    const res = await fetch(
      `http://localhost:9095/api/jobs/search?title=${search}&location=${location}&company=${company}&experience=${experience}`
    );

    const data = await res.json();
    setJobs(data);
  };

  // 🔄 RESET FILTERS
  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setCompany("");
    setExperience("");

    fetch("http://localhost:9095/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  };

  // 📄 APPLY JOB
  const applyJob = async (jobId) => {

    const fileInput = document.createElement("input");
    fileInput.type = "file";

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("candidateId", candidateId);
      formData.append("jobId", jobId);
      formData.append("file", file);

      await fetch("http://localhost:9095/api/applications/apply", {
        method: "POST",
        body: formData
      });

      alert("Applied Successfully");
    };

    fileInput.click();
  };

  return (
    <div className="page">

      <h2>Job Search</h2>

      {/* 🔍 FILTER SECTION */}
      <div className="card">

        <input
          className="input"
          placeholder="Role (Java Developer)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="input"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="input"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="input"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <br />

        <button className="btn btn-blue" onClick={searchJobs}>
          Search
        </button>

        <button className="btn btn-gray" onClick={resetFilters}>
          Reset
        </button>

      </div>

      {/* 🔥 JOB LIST */}
      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <div className="card" key={job.id}>

            <h3>{job.title}</h3>
            <p><b>Company:</b> {job.company}</p>
            <p><b>Location:</b> {job.location}</p>
            <p><b>Description:</b> {job.description}</p>
            <p><b>Experience:</b> {job.experience}</p>

            <button
              className="btn btn-blue"
              onClick={() => applyJob(job.id)}
            >
              Apply
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;