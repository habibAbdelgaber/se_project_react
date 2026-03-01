import ModalWithForm from "../ModalWithForm/ModalWithForm";
import InputField from "../InputField/InputField";
import useForm from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onSignIn, onSwitchToSignUp }) {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    handleFocus,
    reset,
  } = useForm({ email: "", password: "" }, (vals) => {
    onSignIn({
      email: vals.email.trim(),
      password: vals.password,
    })
      .then(() => {
        reset();
        onClose();
      })
      .catch((err) => {
        console.error("Sign in failed:", err);
      });
  });

  const hasBasics = values.email.trim() && values.password.length >= 6;
  const isFormValid = hasBasics && Object.keys(errors).length === 0;

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit}
      title="Sign In"
      name="signin-form"
      size="medium"
      disabled={!isFormValid}
      buttonText="Sign In"
    >
      <InputField
        label="Email"
        id="signin-email"
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
        id="signin-password"
        name="password"
        type="password"
        value={values.password}
        placeholder="Password"
        minLength="6"
        required
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={touched.password && errors.password}
      />
      <button
        type="button"
        className="form__alt-button"
        onClick={onSwitchToSignUp}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
