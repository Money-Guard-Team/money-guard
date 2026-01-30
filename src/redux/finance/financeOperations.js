import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Adresi
axios.defaults.baseURL = 'https://wallet.b.goit.study/api';

export const fetchStatistics = createAsyncThunk(
  'finance/fetchStatistics',
  async ({ month, year }, thunkAPI) => {
    try {
      // Token'ı state'den alıyoruz
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue('Token bulunamadı');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { month, year }
      };

      const { data } = await axios.get('/transactions-summary', config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);