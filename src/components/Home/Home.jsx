import { useSelector } from "react-redux";
import ItemCard from "../ItemCard/ItemCard";
import "./Home.css";

function Home({ weather, clothingItems, onDeleteRequest, closeItemModalTick }) {
  if (!weather) return null;
  const unit = useSelector((state) => state.temperatureUnit);
  const temp = weather.temperature?.[unit];

  return (
    <div className="home">
      <h2 className="home__title">
        Today is {temp}°{unit} in {weather.city}. You may want to wear:
      </h2>
      <ItemCard
        temperature={temp}
        clothingItems={clothingItems}
        onDeleteRequest={onDeleteRequest}
        closeItemModalTick={closeItemModalTick}
      />
    </div>
  );
}

export default Home;
