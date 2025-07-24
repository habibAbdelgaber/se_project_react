import { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import WeatherCard from "./WeatherCard/WeatherCard";
import Home from "./Home/Home";
import ClothingForm from "./ClothingForm/ClothingForm";
import { API_KEY, LATITUDE, LONGITUDE } from "../utils/constants";
import api from "../utils/api";
import { extractWeatherData } from "../utils/weather";

import Spinner from "./Spinner/Spinner";
import APIError from "./APIError/APIError";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await api.get("weather", {
          params: {
            lat: LATITUDE,
            lon: LONGITUDE,
            units: "imperial",
            appid: API_KEY,
          },
        });
        const extracted = extractWeatherData(response);
        if (!extracted) {
          setLoading(true);
          throw new Error("No weather data available");
        }
        setWeather(extracted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <APIError message={`Error fetching weather: ${error}`} />;

  return (
    <>
      <Layout onOpen={() => setFormOpen(true)} currentCity={weather.city}>
        <WeatherCard weather={weather} />
        <Home weather={weather} />
      </Layout>
      <ClothingForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}

export default App;
