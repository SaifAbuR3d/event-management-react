import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useGetOrganizerById } from "../../../API/organizerProfileApi";

export default function OrganizerProtectedRoute({ children }) {
  const { user, isOrganizer } = useContext(UserContext);
  const navigate = useNavigate();
  const { data } = useGetOrganizerById(user?.id);
  console.log(data?.id);

  console.log(data);
  useEffect(() => {
    if (!isOrganizer()) {
      navigate("/");
    }
  }, [isOrganizer, navigate]);

  return isOrganizer() ? <>{children}</> : null;
}
