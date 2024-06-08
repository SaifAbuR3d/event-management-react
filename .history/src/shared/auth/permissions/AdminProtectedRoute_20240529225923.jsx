import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin()) {
      navigate("/");
    }
  }, [isAdmin, navigate]); // Dependencies array ensures useEffect is called when isAdmin or navigate changes

  // Render children if isAdmin, otherwise null while useEffect handles redirect
  return isAdmin() ? <>{children}</> : null;
}
