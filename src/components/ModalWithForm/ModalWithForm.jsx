import Modal from "../Modal/Modal";

import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  children,
  name,
  title,
  onSubmit,
  disabled = false,
  size = "medium",
  buttonText = "Submit",
  ...props
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} name={name} size={size} {...props}>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(e);
        }}
        noValidate
      >
        {title && (
          <h2 id={`${name}-title`} className="form__title">
            {title}
          </h2>
        )}
        {children}
        <button className="form__submit" type="submit" disabled={disabled}>
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
