import React, { useState } from "react";
import { createTrip } from "../controllers/tripController";

function CreateTrip() {
  const [formData, setFormData] = useState({
    userEmail: "",        // This should be set from localStorage
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("User email not found in localStorage. Please login first.");
      return;
    }

    // overwrite userEmail in formData with the one from localStorage
    const tripData = {
      ...formData,
      userEmail: userEmail,
    };

    const result = await createTrip(tripData);

    if (result && result._id) {
      alert("✅ Trip created successfully!");
      setFormData({
        userEmail: "",  // you can keep this empty because next time it'll be overwritten
        destination: "",
        startDate: "",
        endDate: "",
        budget: "",
        description: "",
      });
    } else {
      alert("❌ Failed to create trip.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Trip</h2>

      {/* If you want to show user email but not allow editing, use readOnly or disabled */}
      <input
        type="text"
        name="userEmail"
        placeholder="Email"
        value={localStorage.getItem("userEmail") || ""}
        readOnly
      />

      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
      />
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
      />
      <input
        type="number"
        name="budget"
        placeholder="Budget"
        value={formData.budget}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Trip Description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">Create Trip</button>
    </form>
  );
}

export default CreateTrip;
