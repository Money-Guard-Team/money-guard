import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../redux/transactions/operations";
import { getBalance } from "../../redux/balance/operations"; 
import styles from "./TransactionsItem.module.css";

const TransactionsItem = ({ transaction, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id))
      .unwrap()
      .then(() => {
      
        dispatch(getBalance());
      })
      .catch((error) => {
        console.error("Silme işlemi başarısız:", error);
      });
  };

  return (
    <div
      className={`${styles.item} ${
        transaction.type === "income" ? styles.income : styles.expense
      }`}
    >
      <h4 className={styles.title}>{transaction.title}</h4>
      <p className={styles.amount}>{transaction.amount} ₺</p>
      <small className={styles.date}>{transaction.date}</small>
      <span className={styles.category}>{transaction.category}</span>

      <div className={styles.actions}>
        <button
          onClick={() => onEdit(transaction)}
          className={styles.buttonEdit}
        >
          Edit
        </button>
        <button
          onClick={handleDelete} // 
          className={styles.buttonDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionsItem;