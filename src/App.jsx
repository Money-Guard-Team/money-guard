import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/authOperations";
import Loader from "./components/Loader/Loader";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const DashboardPage = lazy(() => import("./pages/Dashboard/DashboardPage"));
const HomeTab = lazy(() => import("./components/HomeTab/HomeTab.jsx"));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing, isLoggedIn } = useSelector((state) => state.auth || {});

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isLoggedIn ? <RegistrationPage /> : <Navigate to="/dashboard" />} />
        
        <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}>
          <Route index element={<HomeTab />} /> 
          <Route path="home" element={<HomeTab />} />
        </Route>

        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
}

export default App;