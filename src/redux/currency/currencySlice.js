import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrency } from "./currencyOperations.js"; // DİKKAT: Burası çok önemli!

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending: Yükleniyor
      .addCase(fetchCurrency.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fulfilled: Başarılı
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      // Rejected: Hata
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default currencySlice.reducer;
