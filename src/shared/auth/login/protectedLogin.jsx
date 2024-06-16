import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext.jsx";

export default function ProtectedLogin({ children }) {
  const { isAuthenticated, isAdmin } = useContext(UserContext);

  if (isAdmin()) {
    return <Navigate to="/admin-dashboard" />;
  }

  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
