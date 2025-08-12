import { useEffect } from "react";
import { getImage } from "../../utils/imageMap";
import "./Modal.css";

function Modal({ isOpen, children, onClose, name, size = "medium" }) {
  const closeIcon = getImage("Close Icon");
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal_opened");
    }
    return () => document.body.classList.remove("modal_opened");
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    } else {
      document.removeEventListener("keydown", handleEscKey);
    }
  }, [isOpen]);

  const handleCloseButtonClick = () => {
    onClose();
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""} modal_type_${name}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={name ? `${name}-title` : undefined}
      onClick={handleOverlayClick}
    >
      <div className={`modal__content modal__content_size_${size}`}>
        <button
          className="modal__close-button"
          onClick={handleCloseButtonClick}
          type="button"
          aria-label="Close modal"
        >
          <img
            src={closeIcon.image}
            alt={closeIcon.name}
            className="modal__close-icon"
          />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
