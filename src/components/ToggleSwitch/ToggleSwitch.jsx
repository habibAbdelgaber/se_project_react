import { useDispatch, useSelector } from "react-redux";
import { currentTemperatureUnit } from "../../redux/temperature/temperatureUnitSlice";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const unit = useSelector((state) => state.temperatureUnit);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(currentTemperatureUnit());
  };

  return (
    <div
      className="toggle-container"
      onClick={handleToggle}
      role="switch"
      aria-checked={unit === "F"}
    >
      {/* Hint Labels */}
      <span className="toggle-label left">F</span>
      <span className="toggle-label right">C</span>

      {/* Thumb */}
      <div className={`toggle-thumb ${unit === "F" ? "left" : "right"}`}>
        {unit}
      </div>
    </div>
  );
}

export default ToggleSwitch;
