import React, { useEffect, useState } from "react";
import "../styles/TripDetails.css";

function TripDetails() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const userEmail = localStorage.getItem("userEmail");
      console.log("📨 Email from localStorage:", userEmail);

      if (userEmail) {
        try {
          const response = await fetch(`http://localhost:5000/api/tripDetails/user/${userEmail}`);
          const data = await response.json();
          console.log("📦 Trips fetched:", data);
          setTrips(data);
        } catch (error) {
          console.error("❌ Failed to fetch trips:", error);
        }
      }

      setLoading(false);
    };

    fetchTrips();
  }, []);

  if (loading) return <p>Loading trip details...</p>;

  return (
    <div className="trip-details-container">
      <h2>Your <img src="/logo.png" alt="Logo" className="logo" /> Trip Details</h2>
      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip._id} className="trip-card">
              <div className="trip-section">
                <strong>Destination:</strong>
                <span>{trip.destination}</span>
              </div>
              <div className="trip-section">
                <strong>Budget:</strong>
                <span className="taka">${trip.budget}</span>
              </div>
              <div className="trip-section">
                <strong>Description:</strong>
                <span>{trip.description}</span>
              </div>
              <div className="trip-section">
                <strong>Start:</strong>
                <span>{trip.startDate?.slice(0, 10)}</span>
              </div>
              <div className="trip-section">
                <strong>End:</strong>
                <span>{trip.endDate?.slice(0, 10)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TripDetails;
