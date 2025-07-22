import "./InputField.css";

function InputField({
  label,
  id,
  name,
  type = "text",
  value,
  checked,
  onChange,
  onFocus,
  onBlur,
  error,
  required = false,
  minLength,
  maxLength,
  placeholder,
  ...props
}) {
  const hasError = Boolean(error);

  if (type === "checkbox") {
    return (
      <div className="form__group form__group-checkbox">
        <label className="form__label form__label-checkbox">
          <input
            className={`form__input form__input-checkbox ${
              hasError ? "form__input-error" : ""
            }`}
            id={id}
            name={name}
            value={value}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required}
            {...props}
          />
          <span className="form__checkbox-custom" />
          {label}
        </label>
        {hasError && <span className="form__error">{error}</span>}
      </div>
    );
  }

  return (
    <div className="form__group">
      <label htmlFor={id} className="form__label">
        {label} {required && "*"}
      </label>
      <input
        className={`form__input ${hasError ? "form__input-error" : ""}`}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        {...props}
      />
      {hasError && <span className="form__error">{error}</span>}
    </div>
  );
}

export default InputField;
