import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TransactionList from "../Transactions/TransactionsList";
import { getTransactions } from "../../../redux/transactions/operations";
import styles from "./HomeTab.module.css";

const HomeTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return <div className={styles.container}><TransactionList /></div>;
};

export default HomeTab;
