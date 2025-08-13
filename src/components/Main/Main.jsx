import { useSelector } from "react-redux";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

import "./Main.css";

function Main({ weather, clothingItems, onDeleteRequest, closeItemModalTick }) {
  if (!weather) return null;
  const unit = useSelector((state) => state.temperatureUnit);
  const temp = weather.temperature?.[unit];
  return (
    <div className="main">
      <h2 className="main__title">
        Today is {temp}°{unit} in {weather.city}. You may want to wear:
      </h2>
      <WeatherCard weather={weather} />
      <ItemCard
        temperature={temp}
        clothingItems={clothingItems}
        onDeleteRequest={onDeleteRequest}
        closeItemModalTick={closeItemModalTick}
      />
    </div>
  );
}

export default Main;
