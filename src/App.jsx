import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import CurrencyPage from "./pages/CurrencyPage";
import HomeTab from "./components/HomeTab/HomeTab";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/currency" element={<CurrencyPage />} />

            <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<HomeTab />} /> 
            </Route>
       
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
