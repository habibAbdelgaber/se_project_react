import "./APIError.css";

export default function APIError({ errorText }) {
  return (
    <div
      className="api-error"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <p className="api-error__message">{errorText}</p>
    </div>
  );
}
