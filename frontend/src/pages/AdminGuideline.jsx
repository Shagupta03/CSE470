import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // reuse your existing styles

function AdminGuideline() {
  const [guideline, setGuideline] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch guideline on mount
  useEffect(() => {
    const fetchGuideline = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin-guideline");
        const data = await res.json();
        setGuideline(data.message);
      } catch (err) {
        console.error("Error fetching guideline:", err);
        setGuideline("❌ Failed to load admin guideline.");
      }
    };

    fetchGuideline();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="glass-card">
        <h2>📝 Admin Guideline</h2>
        <div className="guideline-box">{guideline}</div>
        <button
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/dashboard")}
        >
          🔙 Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default AdminGuideline;
