import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";

const Header = () => {
  const user = useSelector((state) => state.auth?.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Email'den kullanıcı adı oluştur (@'den önceki kısım)
  const username = user?.email?.split("@")[0] || "User";

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <svg className={styles.logoIcon}>
            <use href="#icon-logo" />
          </svg>
          <span className={styles.logoText}>Money Guard</span>
        </div>

        <div className={styles.userBlock}>
          <span className={styles.userName}>{username}</span>
          <svg className={styles.divider}>
            <use href="#icon-sidebarDivider"></use>
          </svg>
          <button
            className={styles.exitBtn}
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            <svg>
              <use href="#icon-exit"></use>
            </svg>
            <span className={styles.exitText}>Exit</span>
          </button>
        </div>
      </header>

      <div className={styles.userBlock}>
        <span className={styles.userName}>{user?.name || "Name"}</span>
        <span className={styles.divider} />
        <button className={styles.exitBtn}>Exit</button>
      </div>
    </header>
  );
};

export default Header;
