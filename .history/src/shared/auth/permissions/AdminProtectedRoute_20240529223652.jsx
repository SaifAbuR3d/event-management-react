import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export default function AdminProtectedRoute({ children }) {
  const { isAdmin } = useContext(UserContext);
  if (isAdmin) {
    return <>{children}</>;
  }
}
