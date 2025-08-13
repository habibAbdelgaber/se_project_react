import { useState, useEffect } from "react";
import Card from "../Card/Card";
import ItemModal from "../ItemModal/ItemModal";
import getTemperatureRange from "../../utils/weather";
import "./ItemCard.css";
function ItemCard({
  temperature,
  onDeleteRequest,
  closeItemModalTick,
  clothingItems,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if (typeof temperature === "number") {
      const temperatureRange = getTemperatureRange(temperature);
      setCurrentWeather(temperatureRange);
    } else {
      setCurrentWeather(null);
    }
  }, [temperature]);

  const items = (clothingItems ?? []).filter(
    (item) => item.weather === currentWeather
  );

  useEffect(() => {
    if (isOpen) handleClose();
  }, [closeItemModalTick]);

  const handleOpen = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  return (
    <>
      <Card>
        <ul className="card__list">
          {items.map((card) => {
            const key =
              card._id ??
              card.id ??
              `${card.name}-${card.imageUrl ?? card.image}`;
            return (
              <li
                key={key}
                className="card__item"
                onClick={() => handleOpen(card)}
              >
                <h3 className="card__title">{card.name}</h3>
                <img
                  src={card.imageUrl ?? card.image}
                  alt={card.name}
                  className="card__img"
                  loading="lazy"
                />
              </li>
            );
          })}
        </ul>
      </Card>

      {isOpen && selectedCard && (
        <ItemModal
          isOpen={isOpen}
          onClose={handleClose}
          onDeleteRequest={onDeleteRequest}
          item={selectedCard}
        />
      )}
    </>
  );
}

export default ItemCard;
