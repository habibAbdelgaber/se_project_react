import Modal from "../Modal/Modal";
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, onDeleteRequest, item }) {
  const { name, imageUrl, weather } = item || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small" name="Item Details">
      {item && (
        <>
          <img src={imageUrl} alt={name} className="item__image" />
          <div className="item__content">
            <div className="item__header">
              <h3 className="item__title">{name}</h3>
              <button
                className="item__delete-button"
                onClick={() => onDeleteRequest(item)}
              >
                Delete {name} item!
              </button>
            </div>
            <p className="item__caption-weather">Weather: {weather}</p>
          </div>
        </>
      )}
    </Modal>
  );
}
export default ItemModal;
