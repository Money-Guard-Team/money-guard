import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        <span className={styles.icon}>🏠</span>
        Home
      </NavLink>

      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        <span className={styles.icon}>📊</span>
        Statistics
      </NavLink>

      {/* Sadece Mobilde görünür */}
      <NavLink
        to="/dashboard/currency"
        className={({ isActive }) =>
          `${isActive ? styles.active : styles.link} ${styles.mobileOnly}`
        }
      >
        <span className={styles.icon}>💱</span>
        Currency
      </NavLink>
    </nav>
  );
};

export default Navigation;
