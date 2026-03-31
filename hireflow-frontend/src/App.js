import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import MyApplications from "./MyApplications";
import RecruiterDashboard from "./RecruiterDashboard";
import PostJob from "./PostJob";
import Navbar from "./Navbar";
import "./App.css";
import Profile from "./Profile";
import AdminDashboard from "./AdminDashboard";


function App() {

  const [page, setPage] = useState("login");
  const role = localStorage.getItem("role");

  return (
    <div>
      

      {/* NAVBAR */}
      {page !== "login" && page !== "signup" && (
        <Navbar setPage={setPage} />
      )}

      {page === "login" && <Login setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}

      {page === "dashboard" && role === "CANDIDATE" &&
        <Dashboard setPage={setPage} />
      }

      {page === "dashboard" && role === "RECRUITER" &&
        <RecruiterDashboard setPage={setPage} />
      }

      {page === "applications" &&
        <MyApplications setPage={setPage} />
      }

      {page === "postjob" &&
        <PostJob setPage={setPage} />
      }
       {page === "profile" &&
        <Profile setPage={setPage} />
      }
      {page === "dashboard" && role === "ADMIN" && (
        <AdminDashboard />
    )}

    </div>
  );
}

export default App;