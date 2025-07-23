import Modal from "../Modal/Modal";
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, item }) {
  const { name, link, weather } = item || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small" name="Item Details">
      {item && (
        <>
          <img src={link} alt={name} className="item__image" />
          <div className="item__caption">
            <h3 className="item__caption-text">{name}</h3>
            <p className="item__caption-weather">Weather: {weather}</p>
          </div>
        </>
      )}
    </Modal>
  );
}
export default ItemModal;
