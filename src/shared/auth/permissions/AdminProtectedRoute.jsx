import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { isAdmin } = useContext(UserContext);
  return isAdmin() ? <>{children}</> : <Navigate to={"/"} />;
}
