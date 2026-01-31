import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API'den veri çeken asıl fonksiyon
export const fetchCurrency = createAsyncThunk(
  "currency/fetchAll",
  async (_, thunkAPI) => {
    try {
      // PDF'teki API linki
      const response = await axios.get("https://api.monobank.ua/bank/currency");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
