import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div
      className="toggle-container"
      onClick={handleToggleSwitchChange}
      role="switch"
      aria-checked={currentTemperatureUnit === "F"}
    >
      <span className="toggle-label left">F</span>
      <span className="toggle-label right">C</span>
      <div
        className={`toggle-thumb ${currentTemperatureUnit === "F" ? "left" : "right"}`}
      >
        {currentTemperatureUnit}
      </div>
    </div>
  );
}

export default ToggleSwitch;
