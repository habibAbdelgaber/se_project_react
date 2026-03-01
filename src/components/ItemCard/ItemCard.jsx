import { useState, useEffect, useContext } from "react";
import { Heart } from "lucide-react";
import Card from "../Card/Card";
import ItemModal from "../ItemModal/ItemModal";
import getTemperatureRange from "../../utils/weather";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({
  temperature,
  onDeleteRequest,
  closeItemModalTick,
  clothingItems,
  onCardLike,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

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

  const isLiked = (item) => {
    return item.likes?.some((u) => (u._id ?? u) === currentUser?._id);
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
            const liked = isLiked(card);
            return (
              <li key={key} className="card__item" onClick={() => handleOpen(card)}>
                <div className="card__header">
                  <h3 className="card__title">{card.name}</h3>
                  {isLoggedIn && (
                    <button
                      className={`card__like-button ${liked ? "card__like-button_active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardLike?.({ id: card._id ?? card.id, isLiked: liked });
                      }}
                      type="button"
                      aria-label={liked ? "Unlike" : "Like"}
                    >
                      <Heart
                        className="card__like-icon"
                        size={20}
                        fill={liked ? "#ff0000" : "none"}
                        stroke={liked ? "#ff0000" : "currentColor"}
                      />
                    </button>
                  )}
                </div>
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
