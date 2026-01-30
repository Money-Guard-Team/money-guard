import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTransactions = createAsyncThunk(
  'transactions/getAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/transactions');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transaction, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/transactions', transaction);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const editTransaction = createAsyncThunk(
  'transactions/edit',
  async ({ id, updates }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/api/transactions/${id}`, updates);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error');
    }
  }
);