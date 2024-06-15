import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Navigate } from "react-router-dom";

export default function OrganizerProtectedRoute({ children }) {
  const { isOrganizer } = useContext(UserContext);

  return isOrganizer() ? <>{children}</> : <Navigate to={"/"} />;
}
