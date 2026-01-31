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

// DİKKAT: Default export olanlarda süslü parantez {} kullanılmaz!
import authReducer from "./auth/authSlice"; // DÜZELDİ
import currencyReducer from "./currency/currencySlice"; // DÜZELDİ
import globalReducer from "./global/globalSlice"; // DÜZELDİ

// Takım arkadaşlarının yazdığı kısımlar (Onlar export default kullanmadıysa {} kalabilir)
// Ancak genelde Redux slice'ları default export edilir. Eğer hata alırsan bunları da parantezsiz yap.
import { transactionsReducer } from "./transactions/slice";
import { balanceReducer } from "./balance/slice";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
