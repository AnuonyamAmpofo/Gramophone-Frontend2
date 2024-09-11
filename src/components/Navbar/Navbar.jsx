import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <h3 className="logo-name">GRAMOPHONE GHANA</h3>
      <div>
        <button className="sign-up">
          <Link className="btn-link" to="/contactUs">
            SIGN UP
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
