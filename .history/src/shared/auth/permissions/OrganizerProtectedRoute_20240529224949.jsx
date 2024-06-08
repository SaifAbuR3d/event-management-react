import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function OrganizerProtectedRoute({ children }) {
  const { isOrganizer } = useContext(UserContext);
  const navigate = useNavigate();
  if (!isOrganizer()) {
    navigate("/");
  }
  return <>{children}</>;
}
