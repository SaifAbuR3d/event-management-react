import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useGetOrganizerById } from "../../../API/organizerProfileApi";

export default function CurrentOrganizerProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Assuming 'user?.id' should be used to fetch the organizer data
  const {
    data: organizerData,
    isLoading,
    isError,
  } = useGetOrganizerById(user?.id);

  useEffect(() => {
    // Redirect if there's an error or if the loaded organizer is not the current user
    if (isError || (!isLoading && user?.id !== organizerData?.id)) {
      navigate("/");
    }
  }, [navigate, isError, isLoading, user?.id, organizerData?.id]);

  if (isLoading || isError) {
    return null; // Optionally, render a loading spinner or error message
  }

  // Check if the organizer data matches the current user
  if (user?.id === organizerData?.id) {
    return <>{children}</>;
  } else {
    return null; // Or redirect, or render an unauthorized access component
  }
}
