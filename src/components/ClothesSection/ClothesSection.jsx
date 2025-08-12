import { useState, useEffect } from "react";
import Card from "../Card/Card";
import ItemModal from "../ItemModal/ItemModal";
import getTemperatureRenage from "../../utils/weather";
import "./ClothesSection.css";

function ClothesSection({ temperature, clothingItems }) {
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

  const { name, weather, imageUrl } = selectedCard || {};

  const items = (clothingItems ?? []).filter(
    (item) => item.weather === currentWeather
  );

  return (
    <>
      <Card className="clothes-section">
        <ul className="clothes-section__list">
          {items.map((card) => (
            <li
              key={card._id}
              className="clothes-section__item"
              onClick={() => handleOpen(card)}
            >
              <h3 className="clothes-section__title">{card.name}</h3>
              <img
                src={card.imageUrl}
                alt={card.name}
                className="clothes-section__img"
              />
            </li>
          ))}
        </ul>
      </Card>

      {isOpen && selectedCard && (
        <ItemModal
          isOpen={isOpen}
          onClose={handleClose}
          item={{ name, imageUrl, weather }}
        />
      )}
    </>
  );
}
export default ClothesSection;
