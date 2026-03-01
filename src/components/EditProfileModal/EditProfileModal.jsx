import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import InputField from "../InputField/InputField";
import useForm from "../../hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { updateUserProfile } from "../../utils/auth";

function EditProfileModal({ isOpen, onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    handleFocus,
    setFormValues,
  } = useForm(
    { name: currentUser?.name || "", avatar: currentUser?.avatar || "" },
    (vals) => {
      updateUserProfile({
        name: vals.name.trim(),
        avatar: vals.avatar.trim(),
      })
        .then((updated) => {
          handleUpdateUser(updated);
          onClose();
        })
        .catch((err) => {
          console.error("Failed to update profile:", err);
        });
    }
  );

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen]);

  const hasBasics = values.name.trim();
  const isFormValid = hasBasics && Object.keys(errors).length === 0;

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Edit Profile"
      name="edit-profile-form"
      size="medium"
      disabled={!isFormValid}
      buttonText="Save changes"
    >
      <InputField
        label="Name"
        id="edit-name"
        name="name"
        type="text"
        value={values.name}
        placeholder="Name"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={touched.name && errors.name}
      />
      <InputField
        label="Avatar URL"
        id="edit-avatar"
        name="avatar"
        type="url"
        value={values.avatar}
        placeholder="Avatar URL"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={touched.avatar && errors.avatar}
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
