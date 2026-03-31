import "./App.css";

function Navbar({ setPage }) {
  return (
    <div className="navbar">

      <h2>HireFlow</h2>

      <div>
        <button className="btn btn-blue" onClick={() => setPage("dashboard")}>
          Dashboard
        </button>

        <button className="btn btn-blue" onClick={() => setPage("applications")}>
          Applications
        </button>

        <button
          className="btn btn-red"
          onClick={() => {
            localStorage.clear();
            setPage("login");
          }}
        >
          Logout
        </button>
        <button className="btn btn-blue" onClick={() => setPage("profile")}>
            Profile
        </button>
        <button className="btn btn-blue" onClick={() => setPage("dashboard")}>
            Admin Dashboard
        </button>
      </div>

    </div>
  );
}

export default Navbar;