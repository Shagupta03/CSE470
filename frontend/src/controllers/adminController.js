const API = "http://localhost:5000/api/admin";

export const loginAdmin = async (credentials) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return await res.json();
};

export const getAllUsers = async () => {
  const res = await fetch(`${API}/users`);
  return await res.json();
};

export const deleteUser = async (userId) => {
  const res = await fetch(`${API}/user/${userId}`, { method: "DELETE" });
  return await res.json();
};
