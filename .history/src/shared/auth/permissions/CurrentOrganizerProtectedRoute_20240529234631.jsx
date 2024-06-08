import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useGetOrganizerById } from "../../../API/organizerProfileApi";

export default function CurrentOrganizerProtectedRoute({ children }) {
  const { user, isCurrentOrganizer } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    data: organizerData,
    isLoading,
    isError,
  } = useGetOrganizerById(user?.id);

  // Log the fetched data to debug
  console.log(organizerData);

  // Effect to handle redirection based on the fetched data
  useEffect(() => {
    // Navigate to home if there's an error fetching data or if the data check fails
    if (
      isError ||
      (!isLoading && !isCurrentOrganizer(user?.id, organizerData?.id))
    ) {
      navigate("/");
    }
  }, [
    navigate,
    isError,
    isLoading,
    user?.id,
    organizerData?.id,
    isCurrentOrganizer,
  ]);

  // Only render children if not loading, no error, and the user is the current organizer
  if (isLoading || isError) {
    return null; // or some loading/error component
  }

  return isCurrentOrganizer(user?.id, organizerData?.id) ? (
    <>{children}</>
  ) : null;
}
