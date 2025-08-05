import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripDetails from './pages/TripDetails';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/create-trip" element={<CreateTrip />} />
      <Route path="/trip-details" element={<TripDetails />} />
      <Route path="*" element={<Navigate to="/signup" />} />  {/* Redirect unknown routes to signup */}
    </Routes>
  );
}

export default App;
