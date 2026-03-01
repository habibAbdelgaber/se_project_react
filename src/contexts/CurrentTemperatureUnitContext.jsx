import { createContext, useState } from "react";

export const CurrentTemperatureUnitContext = createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: () => {},
});

export function CurrentTemperatureUnitProvider({ children }) {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
}
