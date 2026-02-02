import React, { useState } from "react";
import ModalAddTransaction from "./ModalAddTransaction";
import styles from "./ButtonAddTransaction.module.css";

const ButtonAddTransaction = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={styles.addButton}
      >
        +
      </button>

      {isOpen && <ModalAddTransaction onClose={handleClose} />}
    </>
  );
};

export default ButtonAddTransaction;