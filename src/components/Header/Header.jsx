import { useSelector } from "react-redux";
import styles from "./Header.module.css";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>◆</span>
        Money Guard
      </div>

      <div className={styles.userBlock}>
        <span className={styles.userName}>{user?.name || "Name"}</span>
        <span className={styles.divider} />
        <button className={styles.exitBtn}>Exit</button>
      </div>
    </header>
  );
};

export default Header;
