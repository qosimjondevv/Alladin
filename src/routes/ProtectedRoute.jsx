import { Navigate, useLocation } from "react-router-dom";
import { useAuth }from "../utils/auth";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location       = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/register"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};