import { WEATHER_ICON_URL } from "../../utils/constants";
import { weatherColors } from "../../utils/weatherColors";
import "./WeatherCard.css";

function getTimeOfDay(currentTime, sunrise, sunset) {
  return currentTime >= sunrise && currentTime < sunset ? "day" : "night";
}

function getBackgroundColor(condition, timeOfDay) {
  return weatherColors[timeOfDay][condition] || "#cccccc";
}

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const { condition, icon, description, temperature, sys } = weather;

  const sunrise = sys.sunrise;
  const sunset = sys.sunset;
  const currentTime = Math.floor(Date.now() / 1000);

  const timeOfDay = getTimeOfDay(currentTime, sunrise, sunset);
  const backgroundColor = getBackgroundColor(condition, timeOfDay);
  const iconUrl = `${WEATHER_ICON_URL}${icon}@2x.png`;

  return (
    <div className="weather" style={{ backgroundColor }}>
      <img src={iconUrl} alt={description} className="weather__icon" />
      <h2 className="weather__text">{Math.round(temperature)}°F</h2>
    </div>
  );
}
