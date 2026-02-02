import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api/balance";

export const getBalance = createAsyncThunk(
  "balance/getBalance",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(API_URL);
      return data.balance ?? data.totalBalance ?? 0;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error fetching balance"
      );
    }
  }
);
