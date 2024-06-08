import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function CurrentOrganizerProtectedRoute({ children }) {
  const { user, isCurrentOrganizer } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCurrentOrganizer()) {
      navigate("/");
    }
  }, [navigate, isCurrentOrganizer]);

  return isCurrentOrganizer() ? <>{children}</> : null;
}
