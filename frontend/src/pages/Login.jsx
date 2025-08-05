import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../controllers/authController';  // controller call
import '../styles/login.css';
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      if (res.message === "Login successful") {
        alert("✅ Login successful!");
        localStorage.setItem("userEmail", formData.email);  // Save email
        navigate("/dashboard"); // Redirect
      } else {
        alert("❌ Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Login error. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='login-title'><img src="/logo.png" alt="Logo" className="logo" />
      <h2>Login</h2></div>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>

      <p>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </form>
  );
}

export default Login;
