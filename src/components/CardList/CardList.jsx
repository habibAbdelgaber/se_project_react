import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import { defaultClothingItems } from '../../utils/defaultClothingItems';
import getTemperatureRenage from '../../utils/weather';
import './CardList.css';

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
          {items.map((card, index) => (
            <li
              key={index}
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
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          size="small"
          name="Card Details"
        >
          <img src={link} alt={name} className="card__img" />
          <div className="card__caption">
            <h3 className="card__caption-text">{name}</h3>
            <p className="card__caption-weather">Weather: {weather}</p>
          </div>
        </Modal>
      )}
    </>
  );
}
export default CardList;
