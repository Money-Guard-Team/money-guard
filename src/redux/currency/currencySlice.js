import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1 Saatlik süre (milisaniye cinsinden)
const CACHE_TIME = 60 * 60 * 1000;

export const fetchCurrency = createAsyncThunk(
  "currency/fetchCurrency",
  async (_, thunkAPI) => {
    try {
      // 1. LocalStorage kontrolü
      const savedData = localStorage.getItem("currencyData");
      const savedTime = localStorage.getItem("currencyTime");
      const now = Date.now();

      if (savedData && savedTime) {
        const timeDiff = now - parseInt(savedTime);
        // Eğer 1 saat geçmediyse, kayıtlı veriyi kullan
        if (timeDiff < CACHE_TIME) {
          return JSON.parse(savedData);
        }
      }

      // 2. Süre dolduysa veya veri yoksa API'den çek
      // Not: Monobank API bazen CORS hatası verebilir. Eğer verirse backend üzerinden proxy gerekebilir.
      // Şimdilik direkt istek atıyoruz.
      const response = await axios.get("https://api.monobank.ua/bank/currency");

      // Sadece USD (840) ve EUR (978) kodlarını filtreleyelim (UAH - 980'e göre)
      const filteredData = response.data.filter(
        (item) =>
          (item.currencyCodeA === 840 && item.currencyCodeB === 980) ||
          (item.currencyCodeA === 978 && item.currencyCodeB === 980)
      );

      // 3. Yeni veriyi LocalStorage'a kaydet
      localStorage.setItem("currencyData", JSON.stringify(filteredData));
      localStorage.setItem("currencyTime", now.toString());

      return filteredData;
    } catch (error) {
      // Hata durumunda (Örn: Çok fazla istek - 429) eski veriyi göstermeyi deneyebiliriz
      const savedData = localStorage.getItem("currencyData");
      if (savedData) return JSON.parse(savedData);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const currencyReducer = currencySlice.reducer;
