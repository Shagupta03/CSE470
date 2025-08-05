// src/controllers/tripDetailsController.js

export const getTripsByUser = async (email) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tripDetails/user/${email}`);
    if (!response.ok) {
      throw new Error("Failed to fetch trip details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getTripDetailsByUser:", error.message);
    return [];
  }
};
