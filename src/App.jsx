import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/authOperations";
import Loader from "./components/Loader/Loader";

// Lazy loading ile performans optimizasyonu
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage.jsx"));
const DashboardPage = lazy(() => import("./pages/Dashboard/DashboardPage"));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Private Routes */}
        <Route path="/dashboard/*" element={<DashboardPage />} />

        {/* Hatalı URL'leri Login'e yönlendir */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
