import { useState, useEffect } from "react";
import Card from "../Card/Card";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import getTemperatureRenage from "../../utils/weather";
import "./ItemCard.css";

function CardList({ temperature }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if (temperature !== null && temperature !== undefined) {
      const temperatureRange = getTemperatureRenage(temperature);
      setCurrentWeather(temperatureRange);
    }
  }, [temperature]);

  const handleOpen = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  const { name, weather, link } = selectedCard || {};

  const items = defaultClothingItems.filter(
    (item) => item.weather === currentWeather
  );

  return (
    <>
      <Card>
        <ul className="card__list">
          {items.map((card) => (
            <li
              key={card._id}
              className="card__item"
              onClick={() => handleOpen(card)}
            >
              <h3 className="card__title">{card.name}</h3>
              <img src={card.link} alt={card.name} className="card__img" />
            </li>
          ))}
        </ul>
      </Card>

      {isOpen && selectedCard && (
        <ItemModal
          isOpen={isOpen}
          onClose={handleClose}
          item={{ name, link, weather }}
        />
      )}
    </>
  );
}
export default CardList;
