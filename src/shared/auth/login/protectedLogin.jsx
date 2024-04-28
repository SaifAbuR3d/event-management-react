import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext.jsx";

export default function ProtectedLogin({ children }) {
  const { isAuthenticated } = useContext(UserContext);

  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
