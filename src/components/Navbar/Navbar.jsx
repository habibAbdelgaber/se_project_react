import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { getImage } from '../../utils/imageMap';
import { API_KEY, LATITUDE, LONGITUDE } from '../../utils/constants';
import api from '../../utils/api';
import { extractWeatherData } from '../../utils/weather';
import './Navbar.css';

function Navbar({ onAddClothes }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wtwr = getImage('WTWR');
  const avatarOn = getImage('Avatar On');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await api.get('weather', {
          params: {
            lat: LATITUDE,
            lon: LONGITUDE,
            units: 'imperial',
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

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentDate = new Date().toLocaleDateString('default', {
    month: 'long',
    day: 'numeric',
  });
  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error fetching weather: {error}</p>;
  if (!weather) return null;

  return (
    <Header>
      <nav className="navbar">
        <div
          className={`navbar__menu ${isMenuOpen ? 'navbar__menu-open' : ''}`}
          onClick={handleMenuToggle}
        >
          <span className="navbar__menu-item navbar__menu-item-1"></span>
          <span className="navbar__menu-item navbar__menu-item-2"></span>
          <span className="navbar__menu-item navbar__menu-item-3"></span>
        </div>
        <ul
          className={`navbar__list navbar__list-main ${
            isMenuOpen ? 'navbar__list-open' : ''
          }`}
        >
          <li className="navbar__item">
            <img src={wtwr.image} alt={wtwr.name} className="navbar__logo" />
            <span className="navbar__weather-text">
              {currentDate}, {weather.city}
            </span>
          </li>
          <li className="navbar__item">
            <button
              type="button"
              className="navbar__add-button"
              onClick={onAddClothes}
            >
              + add clothes
            </button>
            <span className="navbar__username">Terrence Tegegne</span>
          </li>
        </ul>

        {/* Avatar always visible */}
        <ul className="navbar__list">
          <li className="navbar__item">
            <img
              src={avatarOn.image}
              alt={avatarOn.name}
              className="navbar__avatar"
            />
          </li>
        </ul>
      </nav>
    </Header>
  );
}

export default Navbar;
