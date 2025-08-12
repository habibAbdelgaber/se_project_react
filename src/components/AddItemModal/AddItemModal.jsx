import ModalWithForm from "../ModalWithForm/ModalWithForm";
import InputField from "../InputField/InputField";
import useForm from "../../hooks/useForm";
function AddItemModal({ isOpen, onAddItem, onClose }) {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    handleFocus,
    reset,
  } = useForm({ name: "", imageUrl: "", weather: [] }, (vals) => {
    onAddItem({
      name: vals.name.trim(),
      imageUrl: vals.imageUrl.trim(),
      weather: vals.weather,
    });
    reset();
    onClose();
  });
  const hasBasics =
    values.name.trim() &&
    values.imageUrl.trim() &&
    Array.isArray(values.weather) &&
    values.weather.length === 1;

  const isFormValid = hasBasics && Object.keys(errors).length === 0;

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit}
      title="Add item"
      name="item-form"
      size="medium"
      disabled={!isFormValid}
      buttonText="Add item"
    >
      <InputField
        label="Name"
        id="name"
        name="name"
        type="text"
        value={values.name}
        placeholder="Name"
        minLength="3"
        maxLength="25"
        required
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={touched.name && errors.name}
      />
      <InputField
        label="ImageUrl"
        id="imageUrl"
        name="imageUrl"
        type="url"
        value={values.imageUrl}
        placeholder="https://example.com/imageUrl.jpg"
        required
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={touched.imageUrl && errors.imageUrl}
      />

      {["hot", "cold", "warm"].map((type) => (
        <InputField
          key={type}
          label={type}
          id={type}
          name="weather"
          type="checkbox"
          value={type}
          checked={values.weather.includes(type)}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ))}
      {/* Show group error once */}
      {touched.weather && errors.weather && (
        <div className="input-error" role="alert">
          {errors.weather}
        </div>
      )}
    </ModalWithForm>
  );
}

export default AddItemModal;
