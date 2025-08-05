// src/controllers/authController.js

const API = "http://localhost:5000/api/auth";

export const loginUser = async (credentials) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return await res.json();
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return await res.json();
};
