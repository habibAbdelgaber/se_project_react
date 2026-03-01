import { useContext } from "react";
import { Plus } from "lucide-react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ weather, onAddItem, clothingItems, onDeleteRequest, closeItemModalTick, onEditProfile, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  if (!weather) return null;
  const temp = weather.temperature?.[currentTemperatureUnit];
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} />
      </div>
      <div className="profile__clothes-section">
        <div className="profile__card">
          <span className="profile__items">Your items</span>
          <button className="profile__add-button" onClick={onAddItem}>
            <Plus className="profile__add-icon" />{" "}
            <span className="profile__add-text">Add item</span>
          </button>
        </div>
        <ClothesSection temperature={temp} clothingItems={clothingItems} onDeleteRequest={onDeleteRequest} closeItemModalTick={closeItemModalTick} onCardLike={onCardLike} />
      </div>
    </div>
  );
}
export default Profile;
