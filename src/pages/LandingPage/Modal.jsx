import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./LandingPage.css";

const Modal = ({ show, handleClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading]= useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e); // Trigger form submission when "Enter" is pressed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://ampsgramophone-backend.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log('Response data:', data); // Log the response data for debugging

      if (response.ok) {
        localStorage.setItem('token', data.token);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${data.sp_userId}`,
          confirmButtonText: "Proceed..."
        });

        setError("");

        if (data.type === "admin") {
          navigate("/dashboard");
        } else if (data.type === "student") {
          navigate("/studentDashboard");
        } else if (data.type === "instructor") {
          navigate("/instructorDashboard");
        }
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress} // Listen for "Enter" key press
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress} // Listen for "Enter" key press
              required
            />
          </div>
          <button type="submit" className="logIn-btn" disabled={isLoading}>
            Login
            {isLoading && <div className="spinner" style={{marginLeft:"10px"}}></div>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
