import SignUp from "./shared/auth/register/SignUp";
import { createBrowserRouter } from "react-router-dom";
import SignUpAttendee from "./shared/auth/register/SignUpAttendee";
import SignUpOrganizer from "./shared/auth/register/SignUpOrganizer";
import RegisterContextProvider from "./shared/auth/context/Register";
import Home from "./components/pages/HomePage";
import AdminLayout from "./components/layouts/AdminLayout";
import MainLayout from "./components/layouts/MainLayout";
import NotFoundPage from "./components/pages/NotFoundPage";
import EventPage from "./components/pages/EventPage";
import OrganizerProfile from "./components/pages/OrganizerProfile"

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "event/:eventId", // event/id
        element: <EventPage />,
      },
        path: "profile/:userName",
        element: <OrganizerProfile />
      }
    ],
  },
  {
    path: "admin-dashboard",
    element: <AdminLayout />,
  },
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
