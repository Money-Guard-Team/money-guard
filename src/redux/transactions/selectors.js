export const selectTransactions = (state) => state.transactions.list;
export const selectTransactionsLoading = (state) => state.transactions.isLoading;
export const selectTransactionsError = (state) => state.transactions.error;