import Modal from "../Modal/Modal";

import "./DeleteConfirmation.css";

function DeleteConfirmation({ isOpen, item, onClose, onConfirm, ...props }) {
  if (!isOpen || !item) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium" {...props}>
      <div className="delete-confirmation">
        <h3 className="delete-confirmation__title">
          Are you sure you want to delete {item?.name}? This action is
          irreversible.
        </h3>
        <div className="delete-confirmation__button-group">
          <button
            className="delete-confirmation__button delete-confirmation__button-confirm"
            onClick={onConfirm}
          >
            Yes, Confirm
          </button>
          <button
            onClick={onClose}
            className="delete-confirmation__button delete-confirmation__button-cancel"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmation;
