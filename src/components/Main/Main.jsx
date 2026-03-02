import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

import "./Main.css";

function Main({ weather, clothingItems, onDeleteRequest, closeItemModalTick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  if (!weather) return null;
  const temp = weather.temperature?.[currentTemperatureUnit];
  return (
    <main className="main">
      <h2 className="main__title">
        Today is {temp}°{currentTemperatureUnit} in {weather.city}. You may want to wear:
      </h2>
      <WeatherCard weather={weather} />
      <ItemCard
        temperature={weather.temperature?.F}
        clothingItems={clothingItems}
        onDeleteRequest={onDeleteRequest}
        closeItemModalTick={closeItemModalTick}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Main;
