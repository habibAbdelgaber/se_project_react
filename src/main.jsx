import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext.jsx";
import { CurrentTemperatureUnitProvider } from "./contexts/CurrentTemperatureUnitContext.jsx";
import App from "./components/App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <CurrentUserProvider>
        <CurrentTemperatureUnitProvider>
          <App />
        </CurrentTemperatureUnitProvider>
      </CurrentUserProvider>
    </Router>
  </StrictMode>
);
