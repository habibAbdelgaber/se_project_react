import Modal from '../Modal/Modal';

import './ModalForm.css';

function ModalForm({
  isOpen,
  onClose,
  children,
  name,
  title,
  onSubmit,
  disabled = false,
  size = 'medium',
  buttonText = 'Submit',
  ...props
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} name={name} size={size} {...props}>
      <form className="form" onSubmit={onSubmit} noValidate>
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

export default ModalForm;
