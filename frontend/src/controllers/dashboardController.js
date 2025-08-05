// src/controllers/dashboardController.js

const API = "http://localhost:5000/api/dashboard";

export const getDashboardData = async (email) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return await res.json();
};
