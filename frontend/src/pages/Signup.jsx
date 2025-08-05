import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    age: '',
    email: '',
    nidNo: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        console.log("User created:", data);
        alert("Registration successful!");
      })
      .catch(err => {
        console.error("Error during registration:", err);
        alert("Registration failed. See console for details.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-title">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2>Signup</h2>
      </div>

      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="nidNo" placeholder="NID No" value={formData.nidNo} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Register</button>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
}

export default Signup;
