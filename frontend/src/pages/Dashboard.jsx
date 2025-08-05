import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../controllers/dashboardController";
import "../styles/Dashboard.css";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      getDashboardData(email).then((data) => setProfile(data.profile));
    }
  }, []);

  const goToCreateTrip = () => {
    navigate("/create-trip");
  };

  const goToTripDetails = () => {
    navigate("/trip-details");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <div className="glass-card">
        <h2>Welcome, {profile.name}</h2>

        <div className="info-grid">
          <div className="info-item">
            <strong>Email:</strong>
            <span>{profile.email}</span>
          </div>
          <div className="info-item">
            <strong>Location:</strong>
            <span>{profile.location}</span>
          </div>
          <div className="info-item">
            <strong>Age:</strong>
            <span>{profile.age}</span>
          </div>
          <div className="info-item">
            <strong>NID:</strong>
            <span>{profile.nidNo}</span>
          </div>
        </div>

        <div className="button-group">
          <button onClick={goToCreateTrip}>➕ Create Trip Plan</button>
          <button onClick={goToTripDetails}>📋 View My Trips</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
