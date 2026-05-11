import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import { Login, Register } from "../Pages/AuthPage";
import Navbar from "../Pages/Navbar";
import TaskDashboard from "../Pages/Dashboard";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const AllRoutes = () => {
  const isDashboard = location.pathname.includes("/dashboard");
  
  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route 
          path="/dashboard/:userId" 
          element={
            <ProtectedRoute>
              <TaskDashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AllRoutes;
