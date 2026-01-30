import { createSlice } from '@reduxjs/toolkit';
import { getTransactions, addTransaction,editTransaction, deleteTransaction } from './operations';

const initialState = {
    list: [],
    isLoading: false,
    error: null,
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTransactions.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.list = action.payload;
        })
        .addCase(getTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(addTransaction.fullfilled, (state, action) => {
            state.list.push(action.payload);
        })
        .addCase(editTransaction.fulfilled, (state, action) => {
            const idx = state.list.findIndex(
                (transaction) => transaction.id === action.payload.id
            );
            if (idx !== -1) {
                state.list[idx] = action.payload;
            }
        })
        .addCase(deleteTransaction.fulfilled, (state, action) => {
            state.list = state.list.filter(
                (transaction) => transaction.id !== action.payload
            );
        });
    },
});

export const transactionsReducer = transactionsSlice.reducer;