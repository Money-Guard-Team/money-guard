import React from "react";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <Navigation />
        <main className={styles.main}>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
