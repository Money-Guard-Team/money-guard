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

// Slice Importları (Takımın yazdığı tüm parçalar)
import { authReducer } from "./auth/authSlice";
import { globalReducer } from "./global/globalSlice"; // YENİ EKLENDİ
import { currencyReducer } from "./currency/currencySlice"; // YENİ EKLENDİ
import { transactionsReducer } from './transactions/slice';
import { balanceReducer } from './balance/slice';


// Auth için Persist Ayarı (Token'ı hafızada tutmak için)
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    global: globalReducer, // EKLENDİ
    currency: currencyReducer, // EKLENDİ
    transactions: transactionsReducer,
    balance: balanceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
