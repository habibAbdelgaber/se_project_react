import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { CurrentUserProvider } from "./contexts/CurrentUserContext.jsx";
import App from "./components/App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </Router>
    </Provider>
  </StrictMode>
);
