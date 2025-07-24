// temperature range helpers
export default function getTemperatureRange(temp) {
  if (temp >= 95) return "very hot";
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  if (temp >= 50) return "cool";
  return "cold";
}

export function extractWeatherData(data) {
  const {
    name: city,
    main: { temp },
    weather: weatherArray,
    sys,
  } = data;

  const condition = weatherArray[0].main;
  const description = weatherArray[0].description;
  const icon = weatherArray[0].icon;

  return {
    // For Home
    temperature: temp,
    city,

    // For WeatherCard
    condition,
    description,
    icon,
    sys, // sunrise and sunset
    full: data, // optional: in case you need more raw data in future
  };
}
