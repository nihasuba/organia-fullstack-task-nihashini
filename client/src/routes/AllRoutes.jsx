import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Home from "../Pages/Home";
import { Login, Register } from "../Pages/AuthPage";
import Navbar from "../Pages/Navbar";
import TaskDashboard from "../Pages/Dashboard";

const AllRoutes = () => {
  const isDashboard = location.pathname.includes("/dashboard");
  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<TaskDashboard/>}/>
      </Routes>
    </>
  );
};

export default AllRoutes;
