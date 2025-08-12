function useFormValidation(values) {
  const errors = {};

  // NAME
  if (typeof values.name === "string") {
    if (!values.name.trim()) {
      errors.name = "Name is required";
    } else if (values.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
  }

  // IMAGE (URL ending with an image extension OR query params)
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

  // WEATHER (array with exactly one choice)
  if (!Array.isArray(values.weather) || values.weather.length !== 1) {
    errors.weather = "Please select one weather condition";
  }

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (
    values.username &&
    (values.username.length < 3 || values.username.length > 25)
  ) {
    errors.username = "Username must be between 3 and 25 characters";
  }
  if (
    values.password &&
    (values.password.length < 8 || values.password.length > 30)
  ) {
    errors.password = "Password must be between 8 and 30 characters";
  }
  if (values.confirmPassword && values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (
    values.imageFile &&
    (!values.imageFile.type?.startsWith("image/") ||
      values.imageFile.size > 2 * 1024 * 1024)
  ) {
    errors.imageFile = errors.imageFile || "Invalid image file";
  }

  return errors;
}

export default useFormValidation;
