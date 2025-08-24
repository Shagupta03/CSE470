const API = "http://localhost:5000/api/emergency";

// Send emergency from user
export const sendEmergency = async (userEmail) => {
  const res = await fetch(`${API}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail }),
  });
  return await res.json();
};

// Get all emergencies (for admin)
export const getAllEmergencies = async () => {
  const res = await fetch(`${API}/all`);
  return await res.json();
};

// Resolve emergency (for admin)
export const resolveEmergency = async (id) => {
  const res = await fetch(`${API}/resolve/${id}`, { method: "PATCH" });
  return await res.json();
};
