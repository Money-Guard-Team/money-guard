import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { addTransaction } from "../../redux/transactions/operations";
import { getBalance } from "../../redux/balance/operations"; // Eklendi
import styles from "./AddTransactionForm.module.css";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  amount: Yup.number().positive().required("Amount is required"),
  category: Yup.string().required("Category is required"),
});

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(addTransaction(data))
      .unwrap()
      .then(() => {
        dispatch(getBalance()); // İşlem başarılıysa bakiyeyi tazele
        onClose();
      })
      .catch((err) => console.error("Ekleme hatası:", err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Title</label>
        <input {...register("title")} className={styles.input} placeholder="Description" />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Amount</label>
        <input type="number" step="0.01" {...register("amount")} className={styles.input} placeholder="0.00" />
        {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Category</label>
        <input {...register("category")} className={styles.input} placeholder="Select Category" />
        {errors.category && <p className={styles.error}>{errors.category.message}</p>}
      </div>

      <button type="submit" className={styles.buttonAdd}>Add</button>
    </form>
  );
};

export default AddTransactionForm;