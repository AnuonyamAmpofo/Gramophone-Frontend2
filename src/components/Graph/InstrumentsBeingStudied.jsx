import { useState, useEffect } from "react";
import axios from "axios";
import "./dashboardInfo.css";

function StudentsEnrolled() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students"); // Replace with your actual API endpoint
        setStudents(response.data.students);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="infoCard">
        <h1>Students Enrolled</h1>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="infoCard">
        <h1>Students Enrolled</h1>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="infoCard">
      <h1>Students Enrolled</h1>
      <h2>{students}</h2>
    </div>
  );
}

export default StudentsEnrolled;
