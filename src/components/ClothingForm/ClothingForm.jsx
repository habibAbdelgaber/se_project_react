import { useState } from 'react';
import ModalForm from '../ModalForm/ModalForm';
import InputField from '../InputField/InputField';

// import './ClothingForm.css';

function ClothingForm({ isOpen, onClose }) {
  const [values, setValues] = useState({
    name: '',
    image: '',
    weather: [],
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { name, image, weather } = values;

  const validateField = (fieldName, fieldValue) => {
    let error;
    switch (fieldName) {
      case 'name':
        if (!fieldValue) {
          error = 'Name must be set';
        } else if (fieldValue.length < 3) {
          error = 'Name must be at least 3 characters';
        }
        break;
      case 'image':
        if (!fieldValue) {
          error = 'Image URL is required';
        } else if (!/^https?:\/\/.+/.test(fieldValue)) {
          error = 'Invalid URL format';
        }
        break;
      default:
        error = undefined;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setValues((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Validation onChange
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: false }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formErrors = {};
    Object.keys(values).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        formErrors[fieldName] = error;
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // console.log({ name, image, weather });
    reset();
    onClose();
  };

  const reset = () => {
    setValues({
      name: '',
      image: '',
      weather: [],
    });
    setErrors({});
    setTouched({});
  };

  const isFormValid =
    !Object.values(errors).some(Boolean) && name && image && weather.length > 0;

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit}
      title="New garment"
      name="clothing-form"
      size="medium"
      disabled={!isFormValid}
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

      {['hot', 'cold', 'windy'].map((type) => (
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
    </ModalForm>
  );
}

export default ClothingForm;
