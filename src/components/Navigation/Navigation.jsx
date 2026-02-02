import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome, MdTimeline } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        <div className={styles.iconWrapper}><MdHome /></div>
        <span className={styles.text}>Home</span>
      </NavLink>

      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        <div className={styles.iconWrapper}><MdTimeline /></div>
        <span className={styles.text}>Statistics</span>
      </NavLink>

      <NavLink
        to="/dashboard/currency"
        className={({ isActive }) =>
          `${isActive ? styles.active : styles.link} ${styles.mobileOnly}`
        }
      >
        <div className={styles.iconWrapper}><FaDollarSign /></div>
        <span className={styles.text}>Currency</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;