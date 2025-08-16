import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/Sidebar";
import "./Profile.css";

function Profile({ weather, isOpen, clothingItems, onDeleteRequest, closeItemModalTick }) {
  if (!weather) return null;
  const unit = useSelector((state) => state.temperatureUnit);
  const temp = weather.temperature?.[unit];
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar />
      </div>
      <div className="profile__clothes-section">
        <div className="profile__card">
          <span className="profile__items">Your items</span>
          <button className="profile__add-button" onClick={isOpen}>
            <Plus className="profile__add-icon" />{" "}
            <span className="profile__add-text">Add item</span>
          </button>
        </div>
        <ClothesSection temperature={temp} clothingItems={clothingItems} onDeleteRequest={onDeleteRequest} closeItemModalTick={closeItemModalTick} />
      </div>
    </div>
  );
}
export default Profile;
