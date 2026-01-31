import { useState } from "react";
import { useSelector } from "react-redux";
import LogoutModal from "./LogoutModal";
import styles from "./Header.module.css";
import React from "react";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Email'den kullanıcı adı oluştur (@'den önceki kısım)
  const username = user?.email?.split("@")[0] || "User";

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◆</span>
          Money Guard
        </div>

        <div className={styles.userBlock}>
          <span className={styles.userName}>{username}</span>
          <span className={styles.divider} />
          <button
            className={styles.exitBtn}
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            Exit
          </button>
        </div>
      </header>

      {isModalOpen && <LogoutModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;
