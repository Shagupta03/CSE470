import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check admin role and fetch users + emergencies
  useEffect(() => {
    const role = localStorage.getItem("role")?.trim();
    if (!role || role !== "admin") {
      navigate("/admin-dashboard", { replace: true });
    } else {
      fetchUsers();
      fetchEmergencies();
      setLoading(false);
    }
  }, [navigate]);
  if (loading) return <p>Loading...</p>;
  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();
      if (res.ok) setUsers(data);
      else console.error("Error fetching users:", data.message);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  // Fetch all emergency alerts
  const fetchEmergencies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/emergency/all");
      const data = await res.json();
      if (res.ok) setEmergencies(data);
      else console.error("Error fetching emergencies:", data.message);
    } catch (err) {
      console.error("Fetch emergencies error:", err);
    }
  };

  // Auto-refresh emergencies every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchEmergencies, 5000);
    return () => clearInterval(interval);
  }, []);

  // Delete user
  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/user/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter((user) => user._id !== userId));
        alert("✅ User deleted successfully!");
      } else {
        alert("❌ Failed to delete user");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/login", { replace: true });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Registered Users</h3>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.email}{" "}
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Emergency Alerts</h3>
      {emergencies.length === 0 ? (
        <p>No emergencies</p>
      ) : (
        <ul>
          {emergencies.map((e) => (
            <li key={e._id}>
              {e.userEmail} triggered emergency at{" "}
              {new Date(e.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
