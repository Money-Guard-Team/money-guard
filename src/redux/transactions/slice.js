import { createSlice } from "@reduxjs/toolkit";
// Buradaki importların doğru çalışması için üstteki dosyanın hatasız olması şart
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactionCategories,
} from "./operations.js";

const initialState = {
  items: [],
  categories: [],
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Fetch Transactions ---
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Add Transaction ---
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // --- Delete Transaction ---
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })

      // --- Edit Transaction ---
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // --- Categories ---
      .addCase(fetchTransactionCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

// Store.js uyumu için NAMED EXPORT yapıyoruz
export const transactionsReducer = transactionsSlice.reducer;
