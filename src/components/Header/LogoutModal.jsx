import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <p>Çıkış yapmak istiyor musun?</p>
      <button onClick={handleLogout}>Evet</button>
      <button onClick={onClose}>İptal</button>
    </div>
  );
};

export default LogoutModal;
