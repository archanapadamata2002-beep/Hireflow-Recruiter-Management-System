import { useState, useEffect } from "react";
import "./App.css";

function RecruiterDashboard({ setPage }) {

  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    jobs: 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    date: "",
    time: "",
    message: ""
  });

  // 🔥 FETCH DATA
  const loadData = () => {
    setLoading(true);

    Promise.all([
      fetch("http://localhost:9095/api/applications/all").then(res => res.json()),
      fetch("http://localhost:9095/api/dashboard/stats").then(res => res.json())
    ])
    .then(([apps, statsData]) => {
      setApplications(apps);
      setStats(statsData);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔥 STATUS UPDATE
  const updateStatus = async (id, action) => {
    await fetch(`http://localhost:9095/api/applications/${id}/${action}`, {
      method: "PUT"
    });

    setMessage("Status Updated");
    loadData();
  };

  // 🔥 INTERVIEW SUBMIT
  const submitInterview = async () => {

    if (!form.date || !form.time) {
      setMessage("Please enter date & time");
      return;
    }

    await fetch(
      `http://localhost:9095/api/applications/${selectedId}/schedule?date=${form.date}&time=${form.time}&message=${form.message}`,
      { method: "PUT" }
    );

    setMessage("Interview Scheduled");
    setShowForm(false);
    setForm({ date: "", time: "", message: "" });

    loadData();
  };

  return (
    <div className="container">

      {/* 🔥 TOAST MESSAGE */}
      {message && <div className="toast">{message}</div>}

      <h2>Recruiter Dashboard</h2>

      {/* 🔥 POST JOB BUTTON */}
      <button
        className="button btn-primary"
        onClick={() => setPage("postjob")}
      >
        + Post Job
      </button>

      {/* 🔥 DASHBOARD STATS */}
      <div className="stats-wrapper">

        <div className="stat-box">
          <h4>Total Jobs</h4>
          <span>{stats.jobs}</span>
        </div>

        <div className="stat-box">
          <h4>Shortlisted</h4>
          <span>{stats.shortlisted}</span>
        </div>

        <div className="stat-box">
          <h4>Selected</h4>
          <span>{stats.selected}</span>
        </div>

        <div className="stat-box">
          <h4>Rejected</h4>
          <span>{stats.rejected}</span>
        </div>

      </div>

      {/* 🔥 LOADING */}
      {loading && <p className="center">Loading...</p>}

      {/* 🔥 EMPTY */}
      {!loading && applications.length === 0 && (
        <p className="center">No applications found</p>
      )}

      {/* 🔥 INTERVIEW FORM */}
      {showForm && (
        <div className="card">

          <h3>Schedule Interview</h3>

          <input
            className="input"
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />

          <input
            className="input"
            type="time"
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
          />

          <input
            className="input"
            placeholder="Message"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
          />

          <br />

          <button className="btn btn-green" onClick={submitInterview}>
            Submit
          </button>

          <button className="btn btn-red" onClick={() => setShowForm(false)}>
            Cancel
          </button>

        </div>
      )}

      <h3>Applications</h3>

      {/* 🔥 APPLICATION LIST */}
      {applications.map(app => {

        const resumePath = encodeURIComponent(
          (app.resumeUrl || "").replace(/\\/g, "/")
        );

        return (
          <div className="card" key={app.id}>

            <p><b>Candidate:</b> {app.candidate?.name}</p>
            <p><b>Email:</b> {app.candidate?.email}</p>
            <p><b>Job:</b> {app.job?.title}</p>

            <p><b>Status:</b> {app.status}</p>
            <p><b>Score:</b> {app.matchScore}</p>

            {app.interviewDate && (
              <p>
                <b>Interview:</b> {app.interviewDate} at {app.interviewTime}
              </p>
            )}

            {app.resumeUrl && (
              <a
                href={`http://localhost:9095/api/applications/resume?path=${resumePath}`}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
            )}

            <br /><br />

            {/* 🔥 ACTION BUTTONS */}
            <button
              className="btn btn-orange"
              onClick={() => updateStatus(app.id, "shortlist")}
            >
              Shortlist
            </button>

            <button
              className="btn btn-green"
              onClick={() => updateStatus(app.id, "select")}
            >
              Select
            </button>

            <button
              className="btn btn-red"
              onClick={() => updateStatus(app.id, "reject")}
            >
              Reject
            </button>

            <button
              className="btn btn-blue"
              onClick={() => {
                setSelectedId(app.id);
                setShowForm(true);
              }}
            >
              Schedule Interview
            </button>

          </div>
        );
      })}

    </div>
  );
}

export default RecruiterDashboard;