import "./APIError.css";

export default function APIError({ message }) {
  return (
    <div
      className="api-error"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <p className="api-error__message">{message}</p>
    </div>
  );
}

// This component can be used to display API error messages in a consistent style
// across the application. It accepts a `message` prop to display the error text.
