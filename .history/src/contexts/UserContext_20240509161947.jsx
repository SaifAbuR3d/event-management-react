import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [user, setUser] = useState(null);

  const saveCurrentUser = (token) => {
    localStorage.setItem("userToken", token);
    setUserToken(token);

    const tokenData = jwtDecode(token);
    setUser({
      id: tokenData["id"],
      userId:
        tokenData[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
      email:
        tokenData[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
      role: tokenData[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
      userName:
        tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      isVerified: tokenData["isVerified"],
    });
  };

  const removeCurrentUser = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUser(null);
  };

  const isOrganizer = () => user?.role == "Organizer";
  const isAdmin = () => user?.role == "Admin";
  const isAttendee = () => user?.role == "Attendee";
  const isAuthenticated = () => userToken != null;
  const isVerified = () => user?.isVerified == "True";

  const isCurrentOrganizer = (userName) =>
    isOrganizer() && user.userName == userName;
  const isCurrentAttendee = (userName) =>
    isAttendee() && user.userName == userName;

  useEffect(() => {
    if (userToken) {
      saveCurrentUser(userToken);
    }
  }, [userToken]);

  return (
    <UserContext.Provider
      value={{
        userToken,
        user,
        saveCurrentUser,
        removeCurrentUser,
        isAuthenticated,
        isOrganizer,
        isAttendee,
        isAdmin,
        isCurrentOrganizer,
        isCurrentAttendee,
        isVerified,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
