import { Link } from "react-router-dom";
import "./Navbar2.css";
import { useState } from "react";

const NavbarAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav-bar2 admin_nav">
      <img className="logo" src="assets\Grammophone2 2.png" alt="" />
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : "nav-ul"}>
        <Link className="links" to="/adminDashboard">
          Dashboard
        </Link>
        <Link className="links" to="/instructorCourses">
          Courses
        </Link>
        <Link className="links" to="/">
          Students
        </Link>
        <Link className="links" to="/">
          Instructors
        </Link>
        <Link className="links" to="/adminPage">
          Admin Page
        </Link>
        <div>
          <button className="log-out">
            <Link className="links" to="/">
              Log Out
            </Link>
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default NavbarAdmin;
