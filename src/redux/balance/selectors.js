export const selectBalance = (state) => state.balance.totalBalance;
export const selectBalanceLoading = (state) => state.balance.isLoading;
export const selectBalanceError = (state) => state.balance.error;