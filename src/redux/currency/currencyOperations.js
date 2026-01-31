import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// LocalStorage cache sistemi ile currency çekme
export const fetchCurrency = createAsyncThunk(
  "currency/fetchAll",
  async (_, thunkAPI) => {
    try {
      // LocalStorage'dan kontrol
      const cachedData = localStorage.getItem("currencyData");
      const cachedTime = localStorage.getItem("currencyTime");

      if (cachedData && cachedTime) {
        const oneHour = 60 * 60 * 1000; // 1 saat milisaniye cinsinden
        const now = new Date().getTime();

        // 1 saatten az geçmişse cache'den al
        if (now - Number(cachedTime) < oneHour) {
          console.log("Currency data loaded from cache");
          return JSON.parse(cachedData);
        }
      }

      // Yeni veri çek
      console.log("Fetching fresh currency data from API");
      const response = await axios.get("https://api.monobank.ua/bank/currency");

      // Sadece USD (840) ve EUR (978) filtrele
      const filtered = response.data.filter(
        (item) => item.currencyCodeA === 840 || item.currencyCodeA === 978,
      );

      // Cache'e kaydet
      localStorage.setItem("currencyData", JSON.stringify(filtered));
      localStorage.setItem("currencyTime", new Date().getTime().toString());

      return filtered;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
