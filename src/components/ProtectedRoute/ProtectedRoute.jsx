import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn, isAuthLoading } = useContext(CurrentUserContext);

  if (isAuthLoading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
