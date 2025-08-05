const API_URL = "http://localhost:5000/api/trips";

export const createTrip = async (tripData) => {
  try {
    const res = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Server responded with error:", data.message);
    }

    return data;
  } catch (error) {
    console.error("Trip creation failed:", error);
    return null;
  }
};
