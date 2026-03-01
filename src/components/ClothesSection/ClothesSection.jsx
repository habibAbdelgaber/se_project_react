import { useState, useEffect, useContext } from "react";
import { Heart } from "lucide-react";
import Card from "../Card/Card";
import ItemModal from "../ItemModal/ItemModal";
import getTemperatureRange from "../../utils/weather";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({ temperature, clothingItems, onDeleteRequest, closeItemModalTick, onCardLike }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  useEffect(() => {
    if (temperature !== null && temperature !== undefined) {
      const temperatureRange = getTemperatureRange(temperature);
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

  useEffect(() => {
    if (isOpen) handleClose();
  }, [closeItemModalTick]);

  const { name, weather, imageUrl } = selectedCard || {};

  const isLiked = (item) => {
    return item.likes?.some((u) => (u._id ?? u) === currentUser?._id);
  };

  return (
    <>
      <Card className="clothes-section">
        <ul className="clothes-section__list">
          {clothingItems?.map((card) => {
            const liked = isLiked(card);
            return (
              <li
                key={card._id}
                className="clothes-section__item"
                onClick={() => handleOpen(card)}
              >
                <div className="clothes-section__header">
                  <h3 className="clothes-section__title">{card.name}</h3>
                  {isLoggedIn && (
                    <button
                      className={`clothes-section__like-button ${liked ? "clothes-section__like-button_active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardLike?.({ id: card._id ?? card.id, isLiked: liked });
                      }}
                      type="button"
                      aria-label={liked ? "Unlike" : "Like"}
                    >
                      <Heart
                        className="clothes-section__like-icon"
                        size={20}
                        fill={liked ? "#ff0000" : "none"}
                        stroke={liked ? "#ff0000" : "currentColor"}
                      />
                    </button>
                  )}
                </div>
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="clothes-section__img"
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
          item={{ name, imageUrl, weather }}
          onDeleteRequest={onDeleteRequest}
          closeItemModalTick={closeItemModalTick}
        />
      )}
    </>
  );
}
export default ClothesSection;
