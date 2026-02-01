import { createSlice } from "@reduxjs/toolkit";
import { getBalance } from "./operations";

const initialState = {
  amount: 0,
  isLoading: false,
  error: null,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.amount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.amount = action.payload;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Named export, store.js ile uyumlu
export const { updateBalance } = balanceSlice.actions;
export const balanceReducer = balanceSlice.reducer;
