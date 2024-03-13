import React from "react";
import SignUp from "./shared/auth/register/SignUp";
import { createBrowserRouter } from "react-router-dom";
import SignUpAttendee from "./shared/auth/register/SignUpAttendee";
import SignUpOrganizer from "./shared/auth/register/SignUpOrganizer";
import RegisterContextProvider from "./shared/auth/context/Register";

export const Router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "register",
        element: (
          <RegisterContextProvider>
            <SignUp />
          </RegisterContextProvider>
        ),
      },
      {
        path: "attendee",
        element: (
          <RegisterContextProvider>            
            <SignUpAttendee />
          </RegisterContextProvider>
        ),
      },
      {
        path: "eventorganizer",
        element: (
          <RegisterContextProvider>
            <SignUpOrganizer />
          </RegisterContextProvider>
        ),
      },
    ],
  },
]);
