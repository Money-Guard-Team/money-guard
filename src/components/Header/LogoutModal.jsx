import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/authOperations";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutModal.module.css"; 

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} type="button">
          ✕
        </button>

        <h2 className={styles.title}>Are you sure you want to log out?</h2>

        <div className={styles.buttons}>
          <button
            className={styles.logoutBtn}
            onClick={handleLogout}
            type="button"
          >
            Log out
          </button>
          <button className={styles.cancelBtn} onClick={onClose} type="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
