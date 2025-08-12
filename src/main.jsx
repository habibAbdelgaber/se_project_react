import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import App from "./components/App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        {/* The Router is not strictly necessary here, but it allows for future routing needs */}
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
