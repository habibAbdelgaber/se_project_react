import { useState } from "react";
import useFormValidation from "./useFormValidation";

function useForm(initialValues = {}, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const errors = useFormValidation(values);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // A single-choice checkbox group
    if (type === "checkbox") {
      setValues((prev) => ({ ...prev, [name]: [value] })); // not boolean!
      setTouched((prev) => ({ ...prev, [name]: true }));
      return;
    }

    const newValue = type === "file" ? files?.[0] : value;
    setValues((prev) => ({ ...prev, [name]: newValue }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      onSubmit?.(values);
    } else {
      // Mark all as touched so errors show
      const allTouched = Object.keys(values).reduce((acc, k) => {
        acc[k] = true;
        return acc;
      }, {});
      setTouched(allTouched);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
    reset,
  };
}

export default useForm;
