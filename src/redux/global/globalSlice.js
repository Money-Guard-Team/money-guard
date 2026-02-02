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
    // Loading işlemi
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Logout Modalı
    openModalLogout: (state) => {
      state.isModalLogoutOpen = true;
    },
    closeModalLogout: (state) => {
      state.isModalLogoutOpen = false;
    },

    // Transaction Ekleme Modalı (EKSİKTİ, EKLENDİ)
    openModalAddTransaction: (state) => {
      state.isModalAddTransactionOpen = true;
    },
    closeModalAddTransaction: (state) => {
      state.isModalAddTransactionOpen = false;
    },

    // Transaction Düzenleme Modalı (EKSİKTİ, EKLENDİ)
    openModalEditTransaction: (state) => {
      state.isModalEditTransactionOpen = true;
    },
    closeModalEditTransaction: (state) => {
      state.isModalEditTransactionOpen = false;
    },
  },
});

export const {
  setIsLoading,
  openModalLogout,
  closeModalLogout,
  openModalAddTransaction,
  closeModalAddTransaction,
  openModalEditTransaction,
  closeModalEditTransaction,
} = globalSlice.actions;

// DÜZELTME BURADA: "export const globalReducer" yerine "export default" yapıyoruz.
export default globalSlice.reducer;
