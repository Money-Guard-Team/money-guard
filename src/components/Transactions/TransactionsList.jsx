import React, { useState } from "react";
import { useSelector } from "react-redux";
import TransactionsItem from "./TransactionsItem";
import ModalEditTransaction from "./ModalEditTransaction";
import styles from "./TransactionsList.module.css";

const TransactionsList = () => {
  const transactions = useSelector((state) => state.transactions.items);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEdit = (transaction) => setSelectedTransaction(transaction);
  const handleCloseModal = () => setSelectedTransaction(null);

  return (
    <div className={styles.listContainer}>
      {transactions.length === 0 ? (
        <p className={styles.placeholder}>No transactions yet</p>
      ) : (
        transactions.map((tx, index) => (
          <TransactionsItem
            key={`${tx.id}-${index}`}
            transaction={tx}
            onEdit={handleEdit}
          />
        ))
      )}

      {selectedTransaction && (
        <ModalEditTransaction
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default TransactionsList;
