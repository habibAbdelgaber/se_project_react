import ModalWithForm from "../ModalWithForm/ModalWithForm";
import InputField from "../InputField/InputField";
import useForm from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onSignUp, onSwitchToSignIn }) {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    handleFocus,
    reset,
  } = useForm({ name: "", avatar: "", email: "", password: "" }, (vals) => {
    onSignUp({
      name: vals.name.trim(),
      avatar: vals.avatar.trim(),
      email: vals.email.trim(),
      password: vals.password,
    })
      .then(() => {
        reset();
        onClose();
      })
      .catch((err) => {
        console.error("Sign up failed:", err);
      });
  });

  const hasBasics =
    values.name.trim() &&
    values.email.trim() &&
    values.password.length >= 6;

  const isFormValid = hasBasics && Object.keys(errors).length === 0;

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit}
      title="Sign Up"
      name="signup-form"
      size="medium"
      disabled={!isFormValid}
      buttonText="Sign Up"
    >
      <InputField
        label="Email"
        id="signup-email"
        name="email"
        type="email"
        value={values.email}
        placeholder="Email"
        required
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={touched.email && errors.email}
      />
      <InputField
        label="Password"
        id="signup-password"
        name="password"
        type="password"
        value={values.password}
        placeholder="Password (min 6 characters)"
        minLength="6"
        required
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={touched.password && errors.password}
      />
      <InputField
        label="Name"
        id="signup-name"
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
        id="signup-avatar"
        name="avatar"
        type="url"
        value={values.avatar}
        placeholder="Avatar URL (optional)"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={touched.avatar && errors.avatar}
      />
      <button
        type="button"
        className="form__alt-button"
        onClick={onSwitchToSignIn}
      >
        or Sign In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
