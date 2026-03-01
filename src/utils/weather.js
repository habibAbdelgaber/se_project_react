export default function getTemperatureRange(temp) {
  if (temp >= 95) return "very hot";
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  if (temp >= 50) return "cool";
  return "cold";
}
