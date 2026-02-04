import css from "./Balance.module.css";
import { useSelector } from "react-redux";
import { selectUserBalance } from "../../redux/auth/selectors.js";

function Balance() {
  const balance = useSelector(selectUserBalance);

  const normalizedBalance =
    typeof balance === "number"
      ? balance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "0.00";

  return (
    <div className={css.balanceCard}>
      <div className={css.balanceContent}>
        <span className={css.label}>YOUR BALANCE</span>
        <div className={css.amountRow}>
          <span className={css.currency}>{"\u20B4"}</span>
          <span className={css.balance}>{normalizedBalance}</span>
        </div>
      </div>
    </div>
  );
}

export default Balance;
