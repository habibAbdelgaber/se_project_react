// temperature range helpers
export function getTemperatureRange(temp) {
  if (temp >= 95) return "very hot";
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  if (temp >= 50) return "cool";
  return "cold";
}

export function extractWeatherData(apiResponse) {
  if (
    !apiResponse ||
    !apiResponse.main ||
    typeof apiResponse.main.temp !== "number"
  ) {
    console.warn("extractWeatherData: Unexpected API format", apiResponse);
    return {
      city: "Unknown",
      temperature: 0,
      weatherType: "unknown",
    };
  }

  const city =
    apiResponse.name && apiResponse.name.trim() !== ""
      ? apiResponse.name
      : "Unknown";
  const temperature = apiResponse.main.temp;
  const weatherType = getTemperatureRange(temperature);

  return {
    city,
    temperature,
    weatherType,
  };
}
export default getTemperatureRange;
