import ModalWithForm from "../ModalWithForm/ModalWithForm";
import InputField from "../InputField/InputField";
import useFormValidation from "../../hooks/useFormValidation";

function ClothingForm({ isOpen, onClose }) {
  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleFocus,
    reset,
  } = useFormValidation({
    name: "",
    image: "",
    weather: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    console.log(values);
    reset();
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit}
      title="New garment"
      name="clothing-form"
      size="medium"
      disabled={!isValid}
      buttonText="Add garment"
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
        label="Image"
        id="image"
        name="image"
        type="url"
        value={values.image}
        placeholder="https://example.com/image.jpg"
        pattern="https?://.+"
        required
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={touched.image && errors.image}
      />

      {["hot", "cold", "windy"].map((type) => (
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
    </ModalWithForm>
  );
}

export default ClothingForm;
