import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../controllers/dashboardController";
import "../styles/dashboard.css";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [guideline, setGuideline] = useState(""); // ✅ State for admin guideline
  const navigate = useNavigate();

  // ✅ Load profile on mount
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "user") {
      navigate("/login"); // redirect if not user
      return;
    }

    const email = localStorage.getItem("userEmail");
    if (email) {
      getDashboardData(email).then((data) => setProfile(data.profile));
    }
  }, [navigate]);

  // ✅ Navigation functions
  const goToCreateTrip = () => navigate("/create-trip");
  const goToTripDetails = () => navigate("/trip-details");

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // ✅ Emergency button
  const handleEmergency = async () => {
    const email = localStorage.getItem("userEmail");
    try {
      const res = await fetch("http://localhost:5000/api/emergency/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: email }),
      });

      const data = await res.json();
      alert(data.message || "🚨 Emergency sent!");
    } catch (err) {
      console.error("Emergency error:", err);
      alert("❌ Failed to send emergency");
    }
  };

  // ✅ Fetch admin guideline
  const handleGuideline = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin-guideline"); // your backend endpoint
      const data = await res.json();
    } catch (err) {
      console.error("Error fetching guideline:", err);
      alert("❌ Failed to fetch admin guideline");
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <div className="glass-card">
        <h2>Welcome, {profile.name}</h2>

        <div className="info-grid">
          <div className="info-item">
            <strong>Email:</strong> <span>{profile.email}</span>
          </div>
          <div className="info-item">
            <strong>Location:</strong> <span>{profile.location}</span>
          </div>
          <div className="info-item">
            <strong>Age:</strong> <span>{profile.age}</span>
          </div>
          <div className="info-item">
            <strong>NID:</strong> <span>{profile.nidNo}</span>
          </div>
        </div>

        <div className="button-group">
          <button onClick={goToCreateTrip}>➕ Create Trip Plan</button>
          <button onClick={goToTripDetails}>📋 View My Trips</button>
          <button onClick={handleEmergency}>🚨 Emergency</button>
          <button onClick={() => navigate("/admin-guideline")}>
            📝 Admin Guideline
          </button>

          <button onClick={handleLogout}>🚪 Logout</button>
        </div>

        {/* Optional: show guideline in page instead of alert */}
        {guideline && <div className="guideline-box">{guideline}</div>}
      </div>
    </div>
  );
}

export default Dashboard;
