import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import AdminGuideline from "./pages/AdminGuideline";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Normal user routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRole="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-trip"
        element={
          <ProtectedRoute allowedRole="user">
            <CreateTrip />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trip-details"
        element={
          <ProtectedRoute allowedRole="user">
            <TripDetails />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/admin-guideline" element={<AdminGuideline />} />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/signup" />} />
    </Routes>
  );
}

export default App;
