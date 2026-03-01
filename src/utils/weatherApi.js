import { BASE_URL, API_KEY, coordinates } from "./constants";

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Error: ${res.status}`));
};

export const getWeather = () => {
  return fetch(
    `${BASE_URL}weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${API_KEY}`
  ).then(processServerResponse);
};

export const extractWeatherData = (data) => {
  const {
    name: city,
    main: { temp },
    weather: weatherArray,
    sys,
  } = data;

  const condition = weatherArray[0].main;
  const description = weatherArray[0].description;
  const icon = weatherArray[0].icon;

  const tempFahrenheit = Math.round(temp);
  const tempCelsius = Math.round(((temp - 32) * 5) / 9);

  return {
    temperature: {
      F: tempFahrenheit,
      C: tempCelsius,
    },
    city,
    condition,
    description,
    icon,
    sys,
    full: data,
  };
};
