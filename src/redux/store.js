import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Default exports
import authReducer from "./auth/authSlice";
import currencyReducer from "./currency/currencySlice";
import globalReducer from "./global/globalSlice";

// Named exports
import { transactionsReducer } from "./transactions/slice";
import { balanceReducer } from "./balance/slice";

import { financeReducer } from "./finance/financeSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    global: globalReducer,
    currency: currencyReducer,
    transactions: transactionsReducer,
    balance: balanceReducer,
    finance: financeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
