import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admindashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [emergencies, setEmergencies] = useState([]);

  // Check admin role and fetch users + emergencies
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role || role !== "admin") {
      navigate("/admin-login");
    } else {
      fetchUsers();
      fetchEmergencies();
    }
  }, [navigate]);

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

  useEffect(() => {
    const interval = setInterval(fetchEmergencies, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">

      {/* Admin Info Box */}
      <div className="box admin-info">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Registered Users Box */}
      <div className="box">
        <h3>Registered Users</h3>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <span>{user.email}</span>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Emergency Alerts Box */}
      <div className="box">
        <h3>Emergency Alerts</h3>
        {emergencies.length === 0 ? (
          <p>No emergencies</p>
        ) : (
          <ul>
            {emergencies.map((e) => (
              <li key={e._id}>
                <span>
                  {e.userEmail} triggered emergency at{" "}
                  {new Date(e.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
