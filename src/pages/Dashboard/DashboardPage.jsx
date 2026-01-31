import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Currency from "../../components/Currency/Currency";
import Balance from "../../components/Balance/Balance.jsx";
import StatisticsDashboard from "../../components/Statistics/StatisticsDashboard";
import styles from "./DashboardPage.module.css";

// HomeTab component'ini import et (arkadaşların yapacak)
// import HomeTab from "../../components/Home/HomeTab";

const DashboardPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        {/* Sol Sidebar */}
        <aside className={styles.sidebar}>
          <Navigation />
          <Balance />
          <Currency />
        </aside>

        {/* Sağ İçerik Alanı */}
        <main className={styles.main}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard/home" replace />}
            />
            {/* <Route path="home" element={<HomeTab />} /> */}
            <Route path="statistics" element={<StatisticsDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
