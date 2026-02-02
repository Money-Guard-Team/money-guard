import React from "react";
import EditTransactionForm from "./EditTransactionForm";
import styles from "./ModalEditTransaction.module.css";

const ModalEditTransaction = ({ onClose, transaction }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Edit Transaction</h3>
        <EditTransactionForm transaction={transaction} onClose={onClose} />
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalEditTransaction;