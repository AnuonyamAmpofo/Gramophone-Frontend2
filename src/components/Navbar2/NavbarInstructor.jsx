import { Link ,useNavigate} from "react-router-dom";
import "./Navbar2.css";
import { useState } from "react";
import Swal from "sweetalert2";

const NavbarInstructor = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token"); // Assuming you store the JWT in localStorage

          const response = await fetch("https://ampsgramophone-backend.vercel.app/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Send the token in the authorization header
            },
          });

          if (response.ok) {
            // Clear the token from localStorage or sessionStorage
            localStorage.removeItem("token");

            // Swal.fire('Logged out!', 'You have been successfully logged out.', 'success');
            navigate("/"); // Navigate to the home page
          } else {
            const data = await response.json();
            Swal.fire("Logout failed!", data.message, "error");
          }
        } catch (err) {
          Swal.fire("Error!", "An error occurred while logging out.", "error");
        }
      }
    });
  };
  return (
    <nav className="nav-bar2">
      <img className="logo" src="/assets/Grammophone2 2.png" alt="" />
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : "nav-ul"}>
        <Link className="links" to="/instructorDashboard">
          Dashboard
        </Link>
        <Link className="links" to="/instructorCourses">
          Courses
        </Link>
        <Link className="links" to="/">
          Annoucements
        </Link>
        <Link className="links" to="/">
          Profile
        </Link>
        <div>
          <button className="log-out" onClick={handleLogout}>
            
              Log Out
            
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default NavbarInstructor;
