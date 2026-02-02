import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome, MdTimeline } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      {/* HOME */}
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""} ${styles.navLinkHome}`
        }
      >
        <svg className={styles.icon}>
          <use href="#icon-home" />
        </svg>
        <span className={styles.iconText}>Home</span>
      </NavLink>

      {/* STATISTICS */}
      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""} ${styles.navLinkStatistics}`
        }
      >
        <svg className={styles.icon}>
          <use href="#icon-statisticsBg" />
          <use href="#icon-statisticsIn" width={16} x="4" y="1" />
        </svg>
        <span className={styles.iconText}>Statistics</span>
      </NavLink>

      {/* CURRENCY (mobile only) */}
      <NavLink
        to="/dashboard/currency"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""} ${styles.mobileOnly}`
        }
      >
        <span className={styles.iconText}>💱 Currency</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;