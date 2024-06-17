import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function AdminProtectedRoute({ children }) {
  const { isAdmin } = useContext(UserContext);
  return isAdmin() ? <>{children}</> : <Navigate to={"/"} />;
}
