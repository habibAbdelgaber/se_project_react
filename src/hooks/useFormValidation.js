function useFormValidation(values) {
  const errors = {};

  if (typeof values.name === "string") {
    if (!values.name.trim()) {
      errors.name = "Name is required";
    } else if (values.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
  }

  if (typeof values.imageUrl === "string") {
    const img = values.imageUrl.trim();
    if (!img) {
      errors.imageUrl = "Image URL is required";
    } else {
      const imagePattern =
        /^https?:\/\/.+(\.(?:jpg|jpeg|png|webp|gif|svg)(?:\?.*)?$|\?.+=.+)$/i;
      if (!imagePattern.test(img)) {
        errors.imageUrl = "Must be a valid image URL";
      }
    }
  }

  if ("weather" in values) {
    if (!Array.isArray(values.weather) || values.weather.length !== 1) {
      errors.weather = "Please select one weather condition";
    }
  }

  if ("email" in values) {
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
  }

  if ("password" in values) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  if ("avatar" in values && values.avatar) {
    const avatar = values.avatar.trim();
    if (avatar) {
      try {
        new URL(avatar);
      } catch {
        errors.avatar = "Must be a valid URL";
      }
    }
  }

  return errors;
}

export default useFormValidation;
