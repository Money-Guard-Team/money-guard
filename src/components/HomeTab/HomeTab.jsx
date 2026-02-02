import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../redux/balance/operations";
import { fetchTransactions } from "../../redux/transactions/operations";

import { selectTransactions } from "../../redux/transactions/selector"; 
import { selectBalance } from "../../redux/balance/selector"; 

import TransactionsList from "../Transactions/TransactionsList";
import ButtonAddTransactions from "../Transactions/ButtonAddTransaction";
import styles from "./HomeTab.module.css";

const HomeTab = () => {
  const dispatch = useDispatch();
  
  const balance = useSelector(selectBalance);
  const transactions = useSelector(selectTransactions);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    dispatch(getBalance());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {user ? `Welcome, ${user.username || user.name}` : "Welcome, User"}
      </h2>

      <h3 className={styles.balance}>Balance: {balance || 0} ₺</h3>

      <TransactionsList transactions={transactions} />

      <ButtonAddTransactions />
    </div>
  );
};

export default HomeTab;