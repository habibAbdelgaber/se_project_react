import { useState } from "react";

export default function useFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        if (value.length < 3) return "Name must be at least 3 characters";
        return null;

      case "image":
        if (!value) return "Image URL is required";
        if (
          !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i.test(value.trim())
        ) {
          return "Must be a valid image URL";
        }
        return null;

      case "weather":
        if (!Array.isArray(value) || value.length === 0)
          return "Please select one weather condition";
        return null;

      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      // Only one checked at a time
      setValues((prev) => ({
        ...prev,
        [name]: [value],
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

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

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const isValid =
    !Object.values(errors).some(Boolean) &&
    Object.entries(values).every(([key, val]) =>
      Array.isArray(val) ? val.length > 0 : val?.trim()
    );

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleFocus,
    reset,
  };
}
