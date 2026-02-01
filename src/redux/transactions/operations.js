import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// 1. Tüm işlemleri getir
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/transactions");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 2. Yeni işlem ekle
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, thunkAPI) => {
    try {
      const response = await axios.post("/transactions", transactionData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 3. İşlem sil
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, thunkAPI) => {
    try {
      await axios.delete(`/transactions/${transactionId}`);
      return transactionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 4. İşlem düzenle (Edit)
export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.patch(`/transactions/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 5. İşlem kategorilerini getir
export const fetchTransactionCategories = createAsyncThunk(
  "transactions/fetchTransactionCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/transaction-categories");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
