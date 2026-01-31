import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBalance = createAsyncThunk(
    'balance/get',
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('/api/balance');
            return data.totalBalance;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Error');
        }   
    }
);