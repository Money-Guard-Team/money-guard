import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Backend adresimiz (.env dosyasından gelir)
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Token İşlemleri için Yardımcı Fonksiyon
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/*
 * REGISTER (Kayıt Ol)
 * POST @ /auth/sign-up
 * Body: { username, email, password }
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/sign-up", credentials);
      // Kayıt olduktan sonra token'ı hemen set et
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * LOGIN (Giriş Yap)
 * POST @ /auth/sign-in
 * Body: { email, password }
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/sign-in", credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * LOGOUT (Çıkış Yap)
 * DELETE @ /auth/sign-out
 * Header: Authorization: Bearer token
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.delete("/auth/sign-out");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * REFRESH USER (Sayfa yenilenince kullanıcıyı hatırla)
 * GET @ /users/current
 * Header: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // State'ten token'ı al
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("/users/current");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
