import { useState, useEffect } from "react";
import { API_KEY, LATITUDE, LONGITUDE } from "../../utils/constants";
import api from "../../utils/api";
import ItemCard from "../ItemCard/ItemCard";
import { extractWeatherData } from "../../utils/weather";
import "./Home.css";

function Home() {
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
        const weather = extractWeatherData(data);
        setWeather(weather);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error fetching weather: {error}</p>;
  if (!weather) return null;

  return (
    <div className="home">
      <h2 className="home__text">
        Today is {Math.round(weather.temperature)}°F / in {weather.city} You may
        want to wear:
      </h2>
      <ItemCard temperature={weather.temperature} />
    </div>
  );
}

export default Home;
