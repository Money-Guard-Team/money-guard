import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Home
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Statistics
        </NavLink>
      </nav>
    </aside>
  );
};

export default Navigation;
