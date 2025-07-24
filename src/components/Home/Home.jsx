import ItemCard from "../ItemCard/ItemCard";
import "./Home.css";

function Home({ weather }) {
  if (!weather) return null;

  return (
    <div className="home">
      <h2 className="home__text">
        Today is {Math.round(weather.temperature)}°F / in {weather.city}. You
        may want to wear:
      </h2>
      <ItemCard temperature={weather.temperature} />
    </div>
  );
}

export default Home;
