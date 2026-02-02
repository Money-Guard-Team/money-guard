import React, { useState, useMemo } from "react"; 
import { useSelector } from "react-redux";
import TransactionItem from "../TransactionItem/TransactionItem";
import styles from "./TransactionList.module.css";
import useMedia from "../../hooks/useMedia";
import { selectTransactions } from "../../redux/transactions/selectors";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const TransactionList = () => {
  const transactions = useSelector(selectTransactions);
  const { isMobile } = useMedia();

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const sortedTransactions = useMemo(() => {
    let sortableItems = [...transactions];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [transactions, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className={styles.tableContainer}>
      {!isMobile && (
        <div className={styles.tableHeader}>
          <div className={styles.headerCell} onClick={() => requestSort("date")}>
            Date {getSortIcon("date")}
          </div>
          <div className={styles.headerCell} onClick={() => requestSort("category")}>
            Category {getSortIcon("category")}
          </div>
          <div className={styles.headerCell} onClick={() => requestSort("amount")}>
            Sum {getSortIcon("amount")}
          </div>
          <div className={styles.headerCell}>Actions</div>
        </div>
      )}
      <ul className={styles.list}>
        {sortedTransactions.map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;