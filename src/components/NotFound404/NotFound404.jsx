import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./NotFound404.css";

function NotFound404() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="notfound">
      <h1 className="notfound__title">404 - Page Not Found!</h1>
      <p className="notfound__message">
        Oh uh! There's nothing here...Sorry 😔
      </p>
    </div>
  );
}

export default NotFound404;
