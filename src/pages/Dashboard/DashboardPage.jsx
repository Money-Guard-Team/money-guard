import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Currency from "../../components/Currency/Currency";
import Balance from "../../components/Balance/Balance.jsx";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Navigation />
          <Balance />
          <Currency />
        </aside>

        <main className={styles.main}>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;