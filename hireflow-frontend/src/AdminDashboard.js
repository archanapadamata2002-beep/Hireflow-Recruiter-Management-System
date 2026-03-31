import { useEffect, useState } from "react";
import "./App.css";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:9095/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  const fetchJobs = async () => {
    const res = await fetch("http://localhost:9095/api/admin/jobs");
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchJobs();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(`http://localhost:9095/api/admin/users/${id}`, {
      method: "DELETE"
    });

    fetchUsers();
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    await fetch(`http://localhost:9095/api/admin/jobs/${id}`, {
      method: "DELETE"
    });

    fetchJobs();
  };

  return (
    <div className="admin-container">

      <h1 className="admin-title">Admin Dashboard</h1>

      {/* USERS SECTION */}
      <div className="section">
        <h2>Users</h2>

        <div className="grid">
          {users.map(user => (
            <div className="card" key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>

              <button className="btn-delete"
                onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* JOBS SECTION */}
      <div className="section">
        <h2>Jobs</h2>

        <div className="grid">
          {jobs.map(job => (
            <div className="card" key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p className="desc">{job.description}</p>

              <button className="btn-delete"
                onClick={() => deleteJob(job.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;