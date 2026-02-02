import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { editTransaction } from "../../redux/transactions/operations";
import { getBalance } from "../../redux/balance/operations"; // Bakiye için eklendi
import styles from "./EditTransactionForm.module.css";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  amount: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive("Amount must be positive")
    .required("Amount is required"),
  category: Yup.string().required("Category is required"),
});

const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: transaction,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Operations dosyasındaki yapıya uyması için veriyi düzeltiyoruz
    const updatedData = {
      id: transaction.id,
      ...data
    };

    dispatch(editTransaction(updatedData))
      .unwrap()
      .then(() => {
        // Düzenleme başarılıysa bakiyeyi de tazele
        dispatch(getBalance());
        onClose();
      })
      .catch((error) => {
        console.error("Güncelleme hatası:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Edit Transaction</h2>
      
      <div className={styles.field}>
        <label className={styles.label}>Title</label>
        <input {...register("title")} className={styles.input} />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Amount</label>
        <input type="number" step="0.01" {...register("amount")} className={styles.input} />
        {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Category</label>
        <input {...register("category")} className={styles.input} />
        {errors.category && <p className={styles.error}>{errors.category.message}</p>}
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.buttonSave}>Save</button>
        <button type="button" onClick={onClose} className={styles.buttonCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditTransactionForm;