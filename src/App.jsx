import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import CurrencyPage from "./pages/CurrencyPage";
import css from "./App.module.css";
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <div className={css.container}>
      <Routes>
        {/* İleride buraya PrivateRoute ve PublicRoute ekleyeceğiz */}
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/currency" element={<CurrencyPage />} />
        <Route path="*" element={<LoginPage />} />{" "}
        {/* Yanlış adrese gideni Login'e at */}
      </Routes>
      <Loader />
    </div>
  );
}

export default App;
