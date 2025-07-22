import { useState, useEffect } from "react";
import {
  API_KEY,
  LATITUDE,
  LONGITUDE,
  WEATHER_ICON_URL,
} from "../../utils/constants";
import { weatherColors } from "../../utils/weatherColors";
import api from "../../utils/api";
import "./Weather.css";

function getTimeOfDay(currentTime, sunrise, sunset) {
  return currentTime >= sunrise && currentTime < sunset ? "day" : "night";
}

function getBackgroundColor(condition, timeOfDay) {
  return weatherColors[timeOfDay][condition] || "#cccccc";
}

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await api.get("weather", {
          params: {
            lat: LATITUDE,
            lon: LONGITUDE,
            units: "imperial",
            appid: API_KEY,
          },
        });
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error fetching weather: {error}</p>;

  const { weather: weatherArr, main, sys } = weather;
  const condition = weatherArr[0].main;
  const iconCode = weatherArr[0].icon;
  const description = weatherArr[0].description;

  const sunrise = sys.sunrise;
  const sunset = sys.sunset;
  const currentTime = Math.floor(Date.now() / 1000);

  const timeOfDay = getTimeOfDay(currentTime, sunrise, sunset);
  const backgroundColor = getBackgroundColor(condition, timeOfDay);
  const iconUrl = `${WEATHER_ICON_URL}${iconCode}@2x.png`;

  return (
    <div
      className="weather"
      style={{
        backgroundColor,
      }}
    >
      <img src={iconUrl} alt={description} className="weather__icon" />
      <h2 className="weather__text">{Math.round(main.temp)}°F</h2>
    </div>
  );
}
