import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Currency from "../../components/Currency/Currency";
import Balance from "../../components/Balance/Balance";

import ButtonAddTransaction from "../../components/Transactions/ButtonAddTransaction";
import ModalAddTransaction from "../../components/Transactions/ModalAddTransaction";
import ModalEditTransaction from "../../components/Transactions/ModalEditTransaction";

import styles from "./DashboardPage.module.css";


const DashboardPage = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <div className={styles.mainLayout}>
        <aside className={styles.sideBar}>
          <div className={styles.navBalance}>
            <Navigation />
            <div className={styles.balanceWrapper}>
              <Balance />
            </div>
          </div>
          <div className={styles.currencyWrapper}>
            <Currency />
          </div>
        </aside>

        {/* Divider */}
        <div className={styles.divider}></div>

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
        <div className={styles.divider}></div>

        <main className={styles.mainContent}>
          <Outlet /> 
          <ButtonAddTransaction />
        </main>
      </div>

      <ModalAddTransaction />
      <ModalEditTransaction />
    </div>
  );
};

export default DashboardPage;