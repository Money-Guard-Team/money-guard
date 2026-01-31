import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  isLoading: false,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { updateBalance } = balanceSlice.actions;
// Store.js uyumu için NAMED EXPORT
export const balanceReducer = balanceSlice.reducer;
