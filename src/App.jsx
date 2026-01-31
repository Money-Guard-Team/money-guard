import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/Loader/Loader";

// Lazy loading ile performans optimizasyonu
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CurrencyPage = lazy(() => import("./pages/CurrencyPage"));

function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Private Routes (İleride PrivateRoute bileşeni ile sarmalanmalı) */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/currency" element={<CurrencyPage />} />

          {/* Hatalı URL'leri Login'e yönlendir */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
      <Loader />
    </div>
  );
}

export default App;
