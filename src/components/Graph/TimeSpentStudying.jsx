import { useState, useEffect } from "react";
import axios from "axios";
import "./dashboardInfo.css";

function NumberOfTutors() {
  const [numberOfTutors, setNumberOfTutors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNumberOfTutors = async () => {
      try {
        const response = await axios.get("/api/numberOfTutors"); // Replace with your actual API endpoint
        setNumberOfTutors(response.data.numberOfTutors);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNumberOfTutors();
  }, []);

  if (loading) {
    return (
      <div className="infoCard">
        <h1>Number of Tutors</h1>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="infoCard">
        <h1>Number of Tutors</h1>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="infoCard">
      <h1>Number of Tutors</h1>
      <h2>{numberOfTutors}</h2>
    </div>
  );
}

export default NumberOfTutors;
