import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isModalAddTransactionOpen: false,
  isModalEditTransactionOpen: false,
  isModalLogoutOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    openModalLogout: (state) => {
      state.isModalLogoutOpen = true;
    },
    closeModalLogout: (state) => {
      state.isModalLogoutOpen = false;
    },
    // Diğer modallar için de benzer reducer'lar eklenebilir
  },
});

export const { setIsLoading, openModalLogout, closeModalLogout } =
  globalSlice.actions;
export const globalReducer = globalSlice.reducer;
