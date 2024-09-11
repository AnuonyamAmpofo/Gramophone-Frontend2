import { useState, useEffect } from "react";
import axios from "axios";
import "./dashboardInfo.css";

function FeesOwed() {
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get("/api/fees"); // Replace with your actual API endpoint
        setFees(response.data.fees);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  if (loading) {
    return (
      <div className="infoCard">
        <h1>Fees Owed</h1>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="infoCard">
        <h1>Fees Owed</h1>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="infoCard">
      <h1>Fees Owed</h1>
      <h2>${fees}</h2>
    </div>
  );
}

export default FeesOwed;
