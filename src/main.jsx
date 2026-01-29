import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Redux Provider
import { PersistGate } from "redux-persist/integration/react"; // Persist Gate
import { ThemeProvider } from "styled-components";

import App from "./App.jsx";
import { GlobalStyle } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { store, persistor } from "./redux/store"; // Store ve Persistor importu

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
