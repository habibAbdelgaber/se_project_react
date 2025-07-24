import "./Spinner.css";
function Spinner() {
  return (
    <div className="spinner" role="status" aria-label="Loading...">
      <div className="spinner__circle"></div>
      <div className="spinner__circle"></div>
      <div className="spinner__circle"></div>
    </div>
  );
}

export default Spinner;
