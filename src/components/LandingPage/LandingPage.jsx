import WeatherCard from "../WeatherCard/WeatherCard";
import Home from "../Home/Home";

function LandingPage({
  weather,
  clothingItems,
  onDeleteRequest,
  closeItemModalTick,
}) {
  return (
    <>
      <WeatherCard weather={weather} />
      <Home
        weather={weather}
        clothingItems={clothingItems}
        onDeleteRequest={onDeleteRequest}
        closeItemModalTick={closeItemModalTick}
      />
    </>
  );
}

export default LandingPage;
