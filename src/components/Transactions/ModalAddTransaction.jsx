import React from "react";
import AddTransactionForm from "./AddTransactionForm";
import styles from "./ModalAddTransaction.module.css";

const ModalAddTransaction = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Add Transaction</h3>
        <AddTransactionForm onClose={onClose} />
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalAddTransaction;