import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
    getCategories,
    getTransactionSummary,
} from "../../api/transactions.js";
import { setToken } from "../../api/userTransactionApi.js";

const getTokenFromStorage = () => {
    try {
        const savedDataLocal = JSON.parse(localStorage.getItem("persist:auth"));
        const savedToken =
            savedDataLocal?.token === "null"
                ? null
                : savedDataLocal?.token?.slice(1, -1);

        return savedToken || null;
    } catch {
        return null;
    }
};

export const getTransactionsSummaryByPeriod = createAsyncThunk(
    "statistics/getTransactionsSummaryByPeriod",
    async (params, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.token;

            if (!token) {
                token = getTokenFromStorage();
            }

            // Token yoksa kullanıcı login olmamış demektir, toast basma
            if (!token) {
                return thunkAPI.rejectWithValue("No token");
            }

            setToken(token);
            const data = await getTransactionSummary(params);
            return data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || "İşlem özeti alınamadı",
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const getTransactionsCategories = createAsyncThunk(
    "statistics/getTransactionsCategories",
    async (_, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.token;

            if (!token) {
                token = getTokenFromStorage();
            }

            // Token yoksa kullanıcı login olmamış demektir, toast basma
            if (!token) {
                return thunkAPI.rejectWithValue("No token");
            }

            setToken(token);
            const data = await getCategories();
            return data;
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Categories could not be retrieved",
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
