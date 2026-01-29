import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import css from "./App.module.css";

function App() {
  return (
    <Routes>
      {/* İleride buraya PrivateRoute ve PublicRoute ekleyeceğiz */}
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<LoginPage />} />{" "}
      {/* Yanlış adrese gideni Login'e at */}
    </Routes>
  );
}

export default App;
