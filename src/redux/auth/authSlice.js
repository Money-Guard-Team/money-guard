import { createSlice } from "@reduxjs/toolkit";
// Senin operasyon dosyandaki tüm fonksiyonları buraya import ediyoruz
import { register, logIn, logOut, refreshUser } from "./authOperations";

const initialState = {
  user: { username: null, email: null }, // Senin kodunda 'username' geçiyor
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null, // Hata yönetimi için ekledim
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- REGISTER ---
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })

      // --- LOGIN ---
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })

      // --- LOGOUT ---
      .addCase(logOut.fulfilled, (state) => {
        state.user = { username: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })

      // --- REFRESH USER (Sayfa Yenilenince) ---
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload; // Genelde API sadece user döner
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        // Token geçersizse çıkış yapmış sayabiliriz
        state.token = null;
      });
  },
});

export default authSlice.reducer;
