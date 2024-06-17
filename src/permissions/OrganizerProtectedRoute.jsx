import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function OrganizerProtectedRoute({ children }) {
  const { isOrganizer } = useContext(UserContext);

  return isOrganizer() ? <>{children}</> : <Navigate to={"/"} />;
}
